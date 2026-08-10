import React, { useState } from 'react';
import { COMPANY_INFO } from '../data/content';
import { ContactFormData } from '../types';
import { Mail, Github, Linkedin, Send, CheckCircle2, MapPin, Terminal, AlertCircle } from 'lucide-react';
import { SectionHeading } from './ui/SectionHeading';
import { Button } from './ui/Button';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    company: '',
    subject: 'Cloud Engineering Inquiry',
    message: ''
  });

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string }>({});

  const validate = () => {
    const errs: { name?: string; email?: string; message?: string } = {};
    if (!formData.name.trim()) errs.name = 'Full name is required';
    if (!formData.email.trim()) {
      errs.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = 'Please enter a valid email address';
    }
    if (!formData.message.trim()) errs.message = 'Project message is required';
    return errs;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name as keyof typeof errors]) {
      setErrors({ ...errors, [e.target.name]: undefined });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setStatus('error');
      return;
    }

    setStatus('submitting');
    setTimeout(() => {
      setStatus('success');
      setFormData({
        name: '',
        email: '',
        company: '',
        subject: 'Cloud Engineering Inquiry',
        message: ''
      });
      setErrors({});
    }, 1200);
  };

  return (
    <section id="contact" className="py-20 bg-[#0b101d] border-t border-slate-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <SectionHeading
          eyebrow="Get in Touch"
          title="Let’s Build Your Cloud Infrastructure"
          subtitle="Have questions regarding our software engineering practices, cloud deployment architectures, or system automation capabilities? We’d love to connect."
          align="left"
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Contact Cards & Links */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Primary Email Card */}
            <a
              href={`mailto:${COMPANY_INFO.email}`}
              className="card-panel p-6 rounded-2xl flex items-center gap-4 group hover:border-blue-500/80 transition-all block"
            >
              <div className="w-12 h-12 rounded-xl bg-blue-600/10 border border-blue-500/20 text-blue-400 flex items-center justify-center shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block">Direct Email</span>
                <span className="text-sm font-bold text-slate-100 group-hover:text-blue-300 transition-colors">
                  {COMPANY_INFO.email}
                </span>
                <p className="text-xs text-slate-400 mt-0.5">Response target: &lt; 24 business hours</p>
              </div>
            </a>

            {/* Social & Code Repositories */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <a
                href={COMPANY_INFO.github}
                target="_blank"
                rel="noopener noreferrer"
                className="card-panel p-5 rounded-xl flex items-center gap-3.5 group hover:border-blue-500/80 transition-all"
              >
                <div className="p-2.5 rounded-lg bg-slate-800 text-slate-300 group-hover:bg-slate-700 group-hover:text-white transition-colors">
                  <Github className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-mono text-slate-400 uppercase block">GitHub</span>
                  <span className="text-xs font-bold text-slate-200">/decodelabs</span>
                </div>
              </a>

              <a
                href={COMPANY_INFO.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="card-panel p-5 rounded-xl flex items-center gap-3.5 group hover:border-blue-500/80 transition-all"
              >
                <div className="p-2.5 rounded-lg bg-slate-800 text-slate-300 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  <Linkedin className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-mono text-slate-400 uppercase block">LinkedIn</span>
                  <span className="text-xs font-bold text-slate-200">DecodeLabs</span>
                </div>
              </a>
            </div>

            {/* Location & Infrastructure Info Box */}
            <div className="p-6 rounded-2xl bg-[#080d18] border border-slate-800/80 space-y-3 font-mono text-xs">
              <div className="flex items-center gap-2 text-slate-300">
                <MapPin className="w-4 h-4 text-cyan-400" />
                <span className="font-semibold">{COMPANY_INFO.location}</span>
              </div>
              <p className="text-slate-400 text-[11px]">
                Engineering operations hosted across AWS cloud regions with multi-zone availability.
              </p>
              <div className="pt-2 border-t border-slate-800/80 text-[10px] text-emerald-400 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                Inquiries channel active and open
              </div>
            </div>

          </div>

          {/* Right Column: Contact Inquiry Form */}
          <div className="lg:col-span-7 card-panel p-8 rounded-2xl border border-slate-800 bg-[#0d1424]">
            <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
              <Terminal className="w-5 h-5 text-blue-400" />
              Send a Technical Inquiry
            </h3>
            <p className="text-xs text-slate-400 mb-6">
              Complete the form below to initiate an architectural discussion or project inquiry.
            </p>

            {status === 'success' ? (
              <div className="p-6 rounded-xl bg-emerald-950/40 border border-emerald-500/40 text-emerald-200 space-y-3 animate-in fade-in duration-300">
                <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                  <CheckCircle2 className="w-5 h-5 shrink-0" />
                  Inquiry Received Successfully
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Thank you for reaching out to DecodeLabs. Your message has been logged in our queue. An engineer will review your inquiry shortly.
                </p>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => setStatus('idle')}
                  className="mt-2"
                >
                  Send Another Inquiry
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                {status === 'error' && (
                  <div className="p-3 rounded-lg bg-rose-950/40 border border-rose-500/40 text-rose-300 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>Please correct the highlighted errors before submitting.</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-xs font-mono text-slate-300 mb-1">
                      Full Name <span className="text-blue-400">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. Alex Mercer"
                      required
                      className={`w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border text-slate-100 text-xs focus:outline-none focus:ring-1 font-sans ${
                        errors.name
                          ? 'border-rose-500 focus:border-rose-500 focus:ring-rose-500'
                          : 'border-slate-800 focus:border-blue-500 focus:ring-blue-500'
                      }`}
                    />
                    {errors.name && <p className="text-[11px] text-rose-400 mt-1 font-mono">{errors.name}</p>}
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-xs font-mono text-slate-300 mb-1">
                      Email Address <span className="text-blue-400">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="alex@example.com"
                      required
                      className={`w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border text-slate-100 text-xs focus:outline-none focus:ring-1 font-sans ${
                        errors.email
                          ? 'border-rose-500 focus:border-rose-500 focus:ring-rose-500'
                          : 'border-slate-800 focus:border-blue-500 focus:ring-blue-500'
                      }`}
                    />
                    {errors.email && <p className="text-[11px] text-rose-400 mt-1 font-mono">{errors.email}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="company" className="block text-xs font-mono text-slate-300 mb-1">
                      Organization / Company
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      placeholder="e.g. Acme Tech"
                      className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-100 text-xs focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 font-sans"
                    />
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-xs font-mono text-slate-300 mb-1">
                      Inquiry Category
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-100 text-xs focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 font-sans"
                    >
                      <option value="Cloud Engineering Inquiry">Cloud Engineering Inquiry</option>
                      <option value="Infrastructure Architecture">Infrastructure Architecture</option>
                      <option value="Nginx / EC2 Deployment">Nginx / EC2 Deployment</option>
                      <option value="General Technical Question">General Technical Question</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-xs font-mono text-slate-300 mb-1">
                    Project Brief / Message <span className="text-blue-400">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Briefly describe your technical objectives or infrastructure requirements..."
                    required
                    className={`w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border text-slate-100 text-xs focus:outline-none focus:ring-1 font-sans resize-none ${
                      errors.message
                        ? 'border-rose-500 focus:border-rose-500 focus:ring-rose-500'
                        : 'border-slate-800 focus:border-blue-500 focus:ring-blue-500'
                    }`}
                  ></textarea>
                  {errors.message && <p className="text-[11px] text-rose-400 mt-1 font-mono">{errors.message}</p>}
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  size="md"
                  disabled={status === 'submitting'}
                  className="w-full"
                  icon={<Send className="w-3.5 h-3.5" />}
                >
                  {status === 'submitting' ? 'Transmitting Inquiry...' : 'Submit Inquiry'}
                </Button>
              </form>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};

