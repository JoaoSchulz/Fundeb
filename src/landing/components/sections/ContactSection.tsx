import { useState } from "react";
import { Send, Mail, User, Building2, FileText } from "lucide-react";
import { toast } from "sonner";
import { Section } from "./Section";
import { SolicitacoesService } from "../../../services/solicitacoesService";

interface ContactFormData {
  name: string;
  email: string;
  organization: string;
  message: string;
}

export const ContactSection = (): JSX.Element => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    organization: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await SolicitacoesService.createSolicitacao({
        nome: formData.name,
        email: formData.email,
        orgao_publico: formData.organization,
        mensagem: formData.message,
      });

      toast.success("Solicitação enviada com sucesso! Aguarde a aprovação de um administrador.");
      setFormData({ name: "", email: "", organization: "", message: "" });
    } catch (error: any) {
      console.error('Erro ao enviar solicitação:', error);
      const errorMessage = error?.message || "Erro ao enviar solicitação. Tente novamente.";
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (field: keyof ContactFormData, value: string): void => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <Section id="contato" title="Fale com nossa equipe e solicite acesso" className="bg-white">
      <div className="max-w-2xl mx-auto">
        <div className="bg-[#f9fafb] rounded-xl border border-[#e5e7eb] p-8 md:p-10 shadow-sm fade-up">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="flex items-center gap-2 text-sm font-medium text-[#181d27] mb-2">
                <User className="w-4 h-4 text-[#717680]" />
                Nome
              </label>
              <input
                id="name"
                type="text"
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
                required
                className="w-full h-11 px-4 py-2.5 rounded-lg border border-[#d5d6d9] bg-white text-[#181d27] placeholder:text-[#858d9d] focus:outline-none focus:ring-2 focus:ring-[#22a3eb] focus:ring-offset-2 transition-all"
                placeholder="Seu nome completo"
              />
            </div>

            <div>
              <label htmlFor="email" className="flex items-center gap-2 text-sm font-medium text-[#181d27] mb-2">
                <Mail className="w-4 h-4 text-[#717680]" />
                E-mail institucional
              </label>
              <input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
                required
                className="w-full h-11 px-4 py-2.5 rounded-lg border border-[#d5d6d9] bg-white text-[#181d27] placeholder:text-[#858d9d] focus:outline-none focus:ring-2 focus:ring-[#22a3eb] focus:ring-offset-2 transition-all"
                placeholder="seu.email@prefeitura.gov.br"
              />
            </div>

            <div>
              <label htmlFor="organization" className="flex items-center gap-2 text-sm font-medium text-[#181d27] mb-2">
                <Building2 className="w-4 h-4 text-[#717680]" />
                Órgão público
              </label>
              <input
                id="organization"
                type="text"
                value={formData.organization}
                onChange={(e) => handleChange("organization", e.target.value)}
                required
                className="w-full h-11 px-4 py-2.5 rounded-lg border border-[#d5d6d9] bg-white text-[#181d27] placeholder:text-[#858d9d] focus:outline-none focus:ring-2 focus:ring-[#22a3eb] focus:ring-offset-2 transition-all"
                placeholder="Prefeitura Municipal de..."
              />
            </div>

            <div>
              <label htmlFor="message" className="flex items-center gap-2 text-sm font-medium text-[#181d27] mb-2">
                <FileText className="w-4 h-4 text-[#717680]" />
                Mensagem
              </label>
              <textarea
                id="message"
                value={formData.message}
                onChange={(e) => handleChange("message", e.target.value)}
                required
                rows={5}
                className="w-full min-h-[120px] px-4 py-2.5 rounded-lg border border-[#d5d6d9] bg-white text-[#181d27] placeholder:text-[#858d9d] focus:outline-none focus:ring-2 focus:ring-[#22a3eb] focus:ring-offset-2 resize-none transition-all"
                placeholder="Conte-nos sobre sua necessidade de acesso..."
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-12 px-8 text-base font-semibold text-white bg-[#22a3eb] hover:bg-[#1a8cc7] rounded-xl transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Enviando..." : "Enviar solicitação"}
              <Send className="w-5 h-5" />
            </button>
          </form>
        </div>

        <div className="mt-8 text-center space-y-2 fade-up">
          <p className="text-base text-[#535861] leading-relaxed">
            Tecnologia a serviço da boa gestão pública.
          </p>
          <p className="text-base text-[#535861] leading-relaxed">
            Educação com transparência, planejamento e continuidade.
          </p>
        </div>
      </div>
    </Section>
  );
};
