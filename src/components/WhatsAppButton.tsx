import { motion, AnimatePresence } from "motion/react";

interface WhatsAppButtonProps {
  isBookingPage: boolean;
  isAtFooter: boolean;
}

export default function WhatsAppButton({ isBookingPage, isAtFooter }: WhatsAppButtonProps) {
  const phoneNumber = "919691529501";
  const message = "Hi! I visited your website and would like to inquire about your web design and development services.";
  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

  return (
    <AnimatePresence>
      {!isAtFooter && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 50 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-6 right-6 z-50 flex flex-col items-end"
        >
          <a
            id="whatsapp-floating-button"
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat on WhatsApp"
            className="block focus:outline-hidden group"
          >
            <motion.div
              layout
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 24,
              }}
              className={`flex overflow-hidden transition-all duration-300 ${
                isBookingPage
                  ? "flex-col items-start bg-white border border-brand-border p-5 rounded-2xl w-[290px] shadow-2xl shadow-brand-dark/10"
                  : "items-center justify-center bg-emerald-500 text-white rounded-full w-14 h-14 shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/40 hover:scale-110 active:scale-95"
              }`}
            >
              <AnimatePresence mode="wait">
                {isBookingPage ? (
                  <motion.div
                    key="whatsapp-card-content"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.2 }}
                    className="flex flex-col w-full text-left"
                  >
                    {/* Card Header */}
                    <div className="flex items-center gap-3 mb-3">
                      <div className="flex items-center justify-center w-10 h-10 bg-emerald-500 text-white rounded-full shadow-md shadow-emerald-500/15 shrink-0">
                        <svg
                          className="w-5.5 h-5.5 fill-current text-white"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.455 5.703 1.458h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-sans font-bold text-sm text-brand-dark leading-tight">Chat on WhatsApp</h4>
                        <span className="text-[10px] text-emerald-500 font-mono font-bold flex items-center gap-1.5 mt-0.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                          Online Support
                        </span>
                      </div>
                    </div>

                    {/* 11-word Description */}
                    <p className="text-xs text-brand-muted leading-relaxed mb-4">
                      Have questions? Get in touch with us directly for instant support.
                    </p>

                    {/* Action CTA Button */}
                    <div className="w-full py-2.5 px-4 bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-2 transition-all duration-300 shadow-md shadow-emerald-500/10">
                      <span>Start Chat</span>
                      <svg
                        className="w-3.5 h-3.5 stroke-current"
                        fill="none"
                        strokeWidth="2.5"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"></path>
                      </svg>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="whatsapp-bubble-content"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.2 }}
                    className="relative flex items-center justify-center w-full h-full"
                  >
                    {/* Glow Ping Animation */}
                    <span className="absolute inset-0 rounded-full bg-emerald-500/40 animate-ping opacity-75 group-hover:opacity-100 duration-1000"></span>

                    {/* WhatsApp SVG Logo */}
                    <svg
                      className="w-7 h-7 relative z-10 animate-bounce-subtle fill-current"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.455 5.703 1.458h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
