import { useState, useRef, useEffect } from 'react';
import { toast } from 'sonner';
import { Button } from '../../../components/ui/button';
import { Card } from '../../../components/ui/card';
import { Input } from '../../../components/ui/input';
import { Label } from '../../../components/ui/label';
import { Loader2, Database, Calendar, Terminal, ChevronDown, ChevronUp, X } from 'lucide-react';
import { AuthService } from '../../auth/services/authService';

interface LogEntry {
  timestamp: string;
  message: string;
  type: 'info' | 'success' | 'error' | 'warning';
}

export const AtualizarDados = (): JSX.Element => {
  const [year, setYear] = useState<string>(new Date().getFullYear().toString());
  const [isUpdating, setIsUpdating] = useState(false);
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [showLogs, setShowLogs] = useState(false);
  const logsEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll para o final dos logs
  useEffect(() => {
    if (logsEndRef.current && showLogs) {
      logsEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [logs, showLogs]);

  const addLog = (message: string, type: LogEntry['type'] = 'info') => {
    const timestamp = new Date().toLocaleTimeString('pt-BR');
    setLogs(prev => [...prev, { timestamp, message, type }]);
    // Garantir que isUpdating permanece true quando recebe logs (processo ainda rodando)
    if (isUpdating && type !== 'success' && !message.includes('concluído')) {
      // Não fazer nada, apenas garantir que isUpdating não seja resetado
    }
  };

  const clearLogs = () => {
    setLogs([]);
  };

  const handleUpdate = async () => {
    if (!year || year.length !== 4) {
      toast.error('Por favor, insira um ano válido (4 dígitos)');
      return;
    }

    setIsUpdating(true);
    setShowLogs(true);
    // Limpar logs ao iniciar nova execução para começar limpo
    clearLogs();

    try {
      // Conectar ao stream SSE de logs
      const eventSource = new EventSource(
        `${import.meta.env.VITE_API_BASE_URL}/admin/fundeb/logs`
      );

      let reconnectAttempts = 0;
      const maxReconnectAttempts = 3;
      let isConnected = false;

      // Listener para receber logs
      eventSource.onmessage = (event) => {
        try {
          // Ignorar heartbeats (mensagens que começam com ':')
          if (event.data.trim().startsWith(':')) {
            return;
          }

          const logData = JSON.parse(event.data);
          addLog(logData.message, logData.level || 'info');
          isConnected = true;
          reconnectAttempts = 0; // Reset contador ao receber mensagem
          
          // Garantir que isUpdating permanece true enquanto recebe logs
          if (isUpdating && !logData.message.includes('concluído') && !logData.message.includes('cancelado')) {
            // Processo ainda está rodando, manter isUpdating = true
          }
        } catch (error) {
          console.error('Erro ao processar log:', error);
        }
      };

      // Listener para quando conexão abre
      eventSource.onopen = () => {
        isConnected = true;
        reconnectAttempts = 0;
        console.log('✅ SSE conectado');
      };

      // Listener para erros de conexão
      eventSource.onerror = (error) => {
        console.warn('⚠️ Erro no SSE (pode ser temporário):', error);
        
        // Se não está conectado e ainda não excedeu tentativas, aguardar reconexão automática
        if (!isConnected && reconnectAttempts < maxReconnectAttempts) {
          reconnectAttempts++;
          console.log(`🔄 Tentando reconectar SSE (tentativa ${reconnectAttempts}/${maxReconnectAttempts})...`);
          // EventSource reconecta automaticamente, apenas aguardar
          return;
        }
        
        // Se excedeu tentativas ou conexão foi fechada intencionalmente
        if (eventSource.readyState === EventSource.CLOSED) {
          console.log('🔌 Conexão SSE fechada');
          // Não fechar manualmente, deixar EventSource gerenciar
        }
      };

      // Salvar referência para fechar depois
      (window as any)._logEventSource = eventSource;

      // Iniciar processo de atualização
      addLog(`Iniciando atualização de dados para o ano ${year}...`, 'info');

      const apiUrl = `${import.meta.env.VITE_API_BASE_URL}/admin/fundeb/${year}/update`;
      console.log('🔗 Chamando API:', apiUrl);

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${AuthService.getToken()}`,
        },
      });

      console.log('📥 Status da resposta:', response.status, response.statusText);

      // Verificar se a resposta tem conteúdo antes de tentar parsear JSON
      const contentType = response.headers.get('content-type');
      let data: any = {};
      
      if (contentType && contentType.includes('application/json')) {
        const text = await response.text();
        if (text) {
          try {
            data = JSON.parse(text);
          } catch (e) {
            console.error('Erro ao parsear JSON:', text);
            throw new Error('Resposta inválida do servidor');
          }
        }
      }

      if (!response.ok) {
        const errorMessage = data.error || data.message || `Erro HTTP ${response.status}: ${response.statusText}`;
        
        // Se for erro 409 (Processo já em execução), não resetar isUpdating
        // para permitir que o usuário cancele
        if (response.status === 409) {
          addLog(`⚠️ ${errorMessage}`, 'warning');
          addLog('Use o botão "Cancelar" para encerrar o processo atual', 'info');
          // Manter isUpdating = true para mostrar botão de cancelar
          toast.warning(errorMessage);
          return; // Não lançar erro, apenas avisar
        }
        
        throw new Error(errorMessage);
      }

      addLog('✓ Processo iniciado com sucesso', 'success');
      addLog('Acompanhe o progresso abaixo...', 'info');

      // Monitorar conclusão (será atualizado via SSE)
      // O botão será reabilitado quando receber log de conclusão

    } catch (error: any) {
      addLog(`✗ Erro ao iniciar atualização: ${error.message}`, 'error');
      setIsUpdating(false);
      toast.error(error.message || 'Erro ao iniciar atualização');

      // Fechar SSE em caso de erro
      if ((window as any)._logEventSource) {
        (window as any)._logEventSource.close();
      }
    }
  };

  // Função para cancelar automação
  const handleCancel = async () => {
    try {
      const apiUrl = `${import.meta.env.VITE_API_BASE_URL}/admin/fundeb/cancel`;
      const response = await fetch(apiUrl, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${AuthService.getToken()}`,
        },
      });

      const data = await response.json();

      if (response.ok) {
        // Limpar logs e resetar estado
        clearLogs();
        setIsUpdating(false);
        setShowLogs(false);
        
        toast.success('Processo cancelado com sucesso');
        
        // Fechar conexão SSE imediatamente
        if ((window as any)._logEventSource) {
          (window as any)._logEventSource.close();
          delete (window as any)._logEventSource;
        }
      } else {
        throw new Error(data.message || 'Erro ao cancelar processo');
      }
    } catch (error: any) {
      toast.error(error.message || 'Erro ao cancelar processo');
      // Em caso de erro, ainda limpar logs e resetar
      clearLogs();
      setIsUpdating(false);
      
      // Fechar conexão SSE em caso de erro também
      if ((window as any)._logEventSource) {
        (window as any)._logEventSource.close();
        delete (window as any)._logEventSource;
      }
    }
  };

  // Monitorar logs para detectar conclusão
  useEffect(() => {
    if (logs.length > 0) {
      const lastLog = logs[logs.length - 1];
      
      // Verificar se o processo foi concluído (sucesso ou erro) ou cancelado
      const isCompleted = 
        lastLog.message.includes('concluído com sucesso') ||
        lastLog.message.includes('Atualização completa') ||
        lastLog.message.includes('Processo finalizado com erro') ||
        lastLog.message.includes('Processo finalizado com avisos') ||
        lastLog.message.includes('Processo cancelado pelo usuário') ||
        lastLog.message.includes('Processo interrompido') ||
        (lastLog.message.includes('Dados carregados no banco') && lastLog.type === 'success');

      if (isCompleted) {
        setIsUpdating(false);
        
        // Fechar conexão SSE após um pequeno delay para garantir que todas as mensagens foram recebidas
        setTimeout(() => {
          if ((window as any)._logEventSource) {
            (window as any)._logEventSource.close();
            delete (window as any)._logEventSource;
          }
        }, 1000);

        // Mostrar toast de sucesso ou erro
        if (lastLog.type === 'success') {
          toast.success('Atualização concluída com sucesso!');
        } else if (lastLog.type === 'error') {
          toast.error('Atualização falhou. Veja os logs para mais detalhes.');
        } else if (lastLog.type === 'warning') {
          if (lastLog.message.includes('cancelado') || lastLog.message.includes('Cancelando')) {
            toast.warning('Processo cancelado.');
            // Aguardar um pouco antes de fechar SSE para garantir que mensagem de cancelamento foi recebida
            setTimeout(() => {
              if ((window as any)._logEventSource) {
                (window as any)._logEventSource.close();
                delete (window as any)._logEventSource;
              }
            }, 2000);
            return; // Não fechar SSE imediatamente
          } else {
            toast.warning('Atualização concluída com avisos. Verifique os logs.');
          }
        }
      }
    }
  }, [logs]);

  // Monitorar se o processo travou (sem logs por muito tempo)
  useEffect(() => {
    if (!isUpdating) return;

    // Se não recebeu logs por 2 minutos, pode ter travado
    const timeout = setTimeout(() => {
      if (isUpdating && logs.length > 0) {
        const lastLogTime = new Date(logs[logs.length - 1].timestamp || Date.now());
        const now = new Date();
        const timeSinceLastLog = now.getTime() - lastLogTime.getTime();
        
        // Se passou mais de 2 minutos sem logs, avisar
        if (timeSinceLastLog > 120000) {
          addLog('⚠️ Processo pode ter travado. Tente cancelar e iniciar novamente.', 'warning');
        }
      }
    }, 120000); // 2 minutos

    return () => clearTimeout(timeout);
  }, [isUpdating, logs]);

  // Cleanup ao desmontar componente
  useEffect(() => {
    return () => {
      if ((window as any)._logEventSource) {
        (window as any)._logEventSource.close();
        delete (window as any)._logEventSource;
      }
    };
  }, []);

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 10 }, (_, i) => currentYear - i);

  const getLogColor = (type: LogEntry['type']) => {
    switch (type) {
      case 'success':
        return 'text-green-400';
      case 'error':
        return 'text-red-400';
      case 'warning':
        return 'text-yellow-400';
      default:
        return 'text-gray-300';
    }
  };

  const getLogIcon = (type: LogEntry['type']) => {
    switch (type) {
      case 'success':
        return '✓';
      case 'error':
        return '✗';
      case 'warning':
        return '⚠';
      default:
        return '›';
    }
  };
  
  return (
    <div className="p-8 max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Atualizar Dados FUNDEB</h1>
        <p className="text-gray-600">
          Atualize os dados do FUNDEB para um ano específico. O sistema processará automaticamente os arquivos CSV e atualizará o banco de dados.
        </p>
      </div>

      <Card className="p-6 mb-6">
        <div className="mb-6">
          <Label htmlFor="year" className="text-base font-semibold flex items-center gap-2 mb-3">
            <Calendar className="w-5 h-5" />
            Ano de Referência
          </Label>
          <div className="flex gap-4 items-center">
            <select
              id="year"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              disabled={isUpdating}
              className="flex h-11 w-full max-w-xs rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {years.map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
            <Button
              onClick={handleUpdate}
              disabled={isUpdating}
              size="lg"
              className="px-8 h-11"
            >
              {isUpdating ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Atualizando...
                </>
              ) : (
                <>
                  <Database className="mr-2 h-5 w-5" />
                  Atualizar
                </>
              )}
            </Button>
            {isUpdating && (
              <Button
                onClick={handleCancel}
                variant="destructive"
                size="lg"
                className="px-8 h-11"
              >
                <X className="mr-2 h-5 w-5" />
                Cancelar
              </Button>
            )}
          </div>
        </div>
      </Card>

      {/* Terminal de Logs */}
      {logs.length > 0 && (
        <Card className="overflow-hidden border-2 border-gray-300">
          <div
            className="bg-gray-800 p-4 flex items-center justify-between cursor-pointer hover:bg-gray-750 transition-colors"
            onClick={() => setShowLogs(!showLogs)}
          >
            <div className="flex items-center gap-3">
              <Terminal className="w-5 h-5 text-green-400" />
              <h3 className="font-semibold text-white">Console de Automação</h3>
              <span className="text-xs text-gray-400 bg-gray-700 px-2 py-1 rounded">
                {logs.length} {logs.length === 1 ? 'entrada' : 'entradas'}
              </span>
            </div>
            <button className="text-gray-400 hover:text-white transition-colors">
              {showLogs ? (
                <ChevronUp className="w-5 h-5" />
              ) : (
                <ChevronDown className="w-5 h-5" />
              )}
            </button>
          </div>

          {showLogs && (
            <div className="bg-gray-900 p-4 font-mono text-sm max-h-96 overflow-y-auto">
              {logs.map((log, index) => (
                <div
                  key={index}
                  className={`mb-1 ${getLogColor(log.type)} flex gap-3`}
                >
                  <span className="text-gray-500 select-none">{log.timestamp}</span>
                  <span className="select-none">{getLogIcon(log.type)}</span>
                  <span className="flex-1">{log.message}</span>
                </div>
              ))}
              <div ref={logsEndRef} />
            </div>
          )}
        </Card>
      )}

      {/* Informações */}
      <Card className="p-6 bg-blue-50 border-blue-200 mt-6">
        <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
          <Database className="w-5 h-5 text-blue-600" />
          Como funciona
        </h3>
        <ol className="space-y-2 text-sm text-gray-700">
          <li className="flex gap-2">
            <span className="font-semibold text-blue-600">1.</span>
            <span>Selecione o ano de referência dos dados que deseja atualizar</span>
          </li>
          <li className="flex gap-2">
            <span className="font-semibold text-blue-600">2.</span>
            <span>Clique em "Atualizar" para iniciar o processo de automação</span>
          </li>
          <li className="flex gap-2">
            <span className="font-semibold text-blue-600">3.</span>
            <span>Acompanhe o progresso em tempo real no console de automação abaixo</span>
          </li>
          <li className="flex gap-2">
            <span className="font-semibold text-blue-600">4.</span>
            <span>O sistema validará o arquivo, processará os dados e atualizará o banco automaticamente</span>
          </li>
          <li className="flex gap-2">
            <span className="font-semibold text-blue-600">5.</span>
            <span>Aguarde a mensagem de conclusão antes de realizar outras operações</span>
          </li>
        </ol>
      </Card>
    </div>
  );
};
