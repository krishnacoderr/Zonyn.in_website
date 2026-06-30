import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Send, CheckCircle2, Calendar, Clock, Database, Trash2, Eye, EyeOff, ChevronLeft, ChevronRight } from "lucide-react";
import { BookingInquiry } from "../types";

const BEST_TIME_SLOTS = [
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "02:00 PM",
  "03:00 PM",
  "04:00 PM",
  "05:00 PM",
  "07:00 PM"
];

export default function Booking() {
  // Form State
  const [formData, setFormData] = useState({
    name: "",
    businessName: "",
    email: "",
    phoneNumber: "",
    preferredDate: "",
    preferredTime: "",
    projectDetails: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Calendar popover state
  const [showCalendar, setShowCalendar] = useState(false);
  const [calendarDate, setCalendarDate] = useState(new Date());
  const calendarRef = useRef<HTMLDivElement>(null);

  // Close calendar when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (calendarRef.current && !calendarRef.current.contains(event.target as Node)) {
        setShowCalendar(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const formatDateValue = (date: Date): string => {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const d = String(date.getDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
  };

  const formatUserDate = (dateStr: string): string => {
    if (!dateStr) return "Select preferred date";
    const parts = dateStr.split("-");
    if (parts.length !== 3) return dateStr;
    const year = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1;
    const day = parseInt(parts[2], 10);
    const date = new Date(year, month, day);
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  const handlePrevMonth = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCalendarDate(new Date(calendarDate.getFullYear(), calendarDate.getMonth() - 1, 1));
  };

  const handleNextMonth = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCalendarDate(new Date(calendarDate.getFullYear(), calendarDate.getMonth() + 1, 1));
  };

  const handleSelectDay = (date: Date) => {
    const formatted = formatDateValue(date);
    setFormData((prev) => ({ ...prev, preferredDate: formatted }));
    if (errors.preferredDate) {
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy.preferredDate;
        return copy;
      });
    }
    setShowCalendar(false);
  };

  const handleSelectTime = (slot: string) => {
    setFormData((prev) => ({ ...prev, preferredTime: slot }));
    if (errors.preferredTime) {
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy.preferredTime;
        return copy;
      });
    }
  };

  // Generate 42 calendar grid cells
  const getCalendarDays = () => {
    const year = calendarDate.getFullYear();
    const month = calendarDate.getMonth();
    const firstDayIndex = new Date(year, month, 1).getDay(); // 0 = Sunday, 1 = Monday etc.
    const totalDays = new Date(year, month + 1, 0).getDate();
    const prevTotalDays = new Date(year, month, 0).getDate();

    const daysArray = [];

    // Fill previous month overlapping days
    for (let i = firstDayIndex - 1; i >= 0; i--) {
      daysArray.push({
        day: prevTotalDays - i,
        isCurrentMonth: false,
        date: new Date(year, month - 1, prevTotalDays - i),
      });
    }

    // Fill current month days
    for (let i = 1; i <= totalDays; i++) {
      daysArray.push({
        day: i,
        isCurrentMonth: true,
        date: new Date(year, month, i),
      });
    }

    // Fill next month overlapping days
    const remainingCells = 42 - daysArray.length;
    for (let i = 1; i <= remainingCells; i++) {
      daysArray.push({
        day: i,
        isCurrentMonth: false,
        date: new Date(year, month + 1, i),
      });
    }

    return daysArray;
  };

  // Admin Inquiries View State
  const [inquiries, setInquiries] = useState<BookingInquiry[]>([]);
  const [showAdminPanel, setShowAdminPanel] = useState(false);

  // Load inquiries from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem("zonyn_inquiries");
    if (stored) {
      try {
        setInquiries(JSON.parse(stored));
      } catch (e) {
        console.error("Failed to parse stored inquiries", e);
      }
    }
  }, []);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.businessName.trim()) newErrors.businessName = "Business name is required";
    if (!formData.phoneNumber.trim()) newErrors.phoneNumber = "Phone number is required";
    if (!formData.preferredDate) newErrors.preferredDate = "Preferred date is required";
    if (!formData.preferredTime) newErrors.preferredTime = "Preferred time is required";
    if (!formData.projectDetails.trim()) newErrors.projectDetails = "Please tell us a bit about your project";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy[name];
        return copy;
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    // Simulate high-end server request latency
    setTimeout(() => {
      const newInquiry: BookingInquiry = {
        id: "inq-" + Math.random().toString(36).substring(2, 9),
        ...formData,
        createdAt: new Date().toISOString(),
      };

      const updatedInquiries = [newInquiry, ...inquiries];
      setInquiries(updatedInquiries);
      localStorage.setItem("zonyn_inquiries", JSON.stringify(updatedInquiries));

      setIsSubmitting(false);
      setIsSuccess(true);
      
      // Reset form
      setFormData({
        name: "",
        businessName: "",
        email: "",
        phoneNumber: "",
        preferredDate: "",
        preferredTime: "",
        projectDetails: "",
      });
    }, 1500);
  };

  const deleteInquiry = (id: string) => {
    const updated = inquiries.filter((inq) => inq.id !== id);
    setInquiries(updated);
    localStorage.setItem("zonyn_inquiries", JSON.stringify(updated));
  };

  return (
    <section
      id="book"
      className="py-24 md:py-32 px-6 md:px-12 bg-brand-bg border-t border-brand-border relative"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Booking Form */}
          <div className="lg:col-span-7 bg-white border border-brand-border rounded-[24px] p-8 md:p-10 shadow-sm relative">
            
            <AnimatePresence mode="wait">
              {!isSuccess ? (
                <motion.form
                  key="booking-form"
                  id="client-booking-form"
                  onSubmit={handleSubmit}
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-6"
                >
                  <div className="space-y-2">
                    <h2 className="font-sans text-2xl sm:text-3xl font-bold text-brand-dark tracking-tight">
                      Book Your Free Consultation
                    </h2>
                    <p className="text-sm text-brand-muted font-light">
                      Let's design a high-converting website engineered to grow your company.
                    </p>
                  </div>

                  {/* Dual Grid Fields */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Name */}
                    <div className="space-y-1.5">
                      <label htmlFor="name" className="text-xs font-display font-bold text-brand-dark/80">
                        Full Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 text-sm bg-brand-bg border rounded-xl outline-hidden focus:border-brand-orange transition-colors ${
                          errors.name ? "border-red-500" : "border-brand-border"
                        }`}
                        placeholder="Your Name"
                      />
                      {errors.name && <span className="text-[11px] font-mono text-red-500">{errors.name}</span>}
                    </div>

                    {/* Business Name */}
                    <div className="space-y-1.5">
                      <label htmlFor="businessName" className="text-xs font-display font-bold text-brand-dark/80">
                        Business Name
                      </label>
                      <input
                        type="text"
                        id="businessName"
                        name="businessName"
                        value={formData.businessName}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 text-sm bg-brand-bg border rounded-xl outline-hidden focus:border-brand-orange transition-colors ${
                          errors.businessName ? "border-red-500" : "border-brand-border"
                        }`}
                        placeholder="Your Business Name"
                      />
                      {errors.businessName && <span className="text-[11px] font-mono text-red-500">{errors.businessName}</span>}
                    </div>
                  </div>

                  {/* Phone Number */}
                  <div className="space-y-1.5">
                    <label htmlFor="phoneNumber" className="text-xs font-display font-bold text-brand-dark/80">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phoneNumber"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 text-sm bg-brand-bg border rounded-xl outline-hidden focus:border-brand-orange transition-colors ${
                        errors.phoneNumber ? "border-red-500" : "border-brand-border"
                      }`}
                      placeholder="+91 9876543210"
                    />
                    {errors.phoneNumber && <span className="text-[11px] font-mono text-red-500">{errors.phoneNumber}</span>}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Preferred Date */}
                    <div className="space-y-1.5 relative" ref={calendarRef}>
                      <label htmlFor="preferredDate" className="text-xs font-display font-bold text-brand-dark/80 flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-brand-muted" /> Preferred Date
                      </label>
                      
                      <button
                        type="button"
                        id="preferredDate"
                        onClick={() => setShowCalendar(!showCalendar)}
                        className={`w-full px-4 py-3 text-sm bg-brand-bg border rounded-xl outline-hidden focus:border-brand-orange transition-all cursor-pointer text-left flex items-center justify-between ${
                          errors.preferredDate ? "border-red-500" : "border-brand-border"
                        } ${formData.preferredDate ? "text-brand-dark font-medium" : "text-brand-muted/70"}`}
                      >
                        <span>{formData.preferredDate ? formatUserDate(formData.preferredDate) : "Select preferred date"}</span>
                        <Calendar className="w-4 h-4 text-brand-muted/70" />
                      </button>

                      {errors.preferredDate && <span className="text-[11px] font-mono text-red-500">{errors.preferredDate}</span>}

                      <AnimatePresence>
                        {showCalendar && (
                          <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                            transition={{ duration: 0.15 }}
                            className="absolute left-0 right-0 sm:right-auto sm:w-[325px] mt-2 bg-[#F8F7F3] border border-brand-border rounded-2xl shadow-xl p-4 z-50 select-none font-sans"
                          >
                            {/* Header */}
                            <div className="flex items-center justify-between mb-4">
                              <button
                                type="button"
                                onClick={handlePrevMonth}
                                className="p-1.5 hover:bg-brand-border text-brand-dark rounded-lg transition-colors cursor-pointer"
                              >
                                <ChevronLeft className="w-4 h-4" />
                              </button>
                              <div className="font-display font-bold text-sm tracking-tight text-brand-dark">
                                {calendarDate.toLocaleDateString("en-US", { month: "long", year: "numeric" })}
                              </div>
                              <button
                                type="button"
                                onClick={handleNextMonth}
                                className="p-1.5 hover:bg-brand-border text-brand-dark rounded-lg transition-colors cursor-pointer"
                              >
                                <ChevronRight className="w-4 h-4" />
                              </button>
                            </div>

                            {/* Weekday Labels */}
                            <div className="grid grid-cols-7 gap-1 text-center mb-1">
                              {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
                                <div key={day} className="text-[10px] font-mono uppercase tracking-wider text-brand-muted font-bold py-1">
                                  {day}
                                </div>
                              ))}
                            </div>

                            {/* Days Grid */}
                            <div className="grid grid-cols-7 gap-1 text-center">
                              {getCalendarDays().map(({ day, isCurrentMonth, date }, idx) => {
                                const formattedVal = formatDateValue(date);
                                const isSelected = formData.preferredDate === formattedVal;
                                const isToday = formatDateValue(new Date()) === formattedVal;

                                return (
                                  <button
                                    key={idx}
                                    type="button"
                                    onClick={() => handleSelectDay(date)}
                                    className={`aspect-square w-full rounded-lg text-xs flex flex-col items-center justify-center relative transition-all cursor-pointer ${
                                      isSelected
                                        ? "bg-brand-orange text-white font-bold shadow-sm"
                                        : isCurrentMonth
                                        ? "text-brand-dark hover:bg-brand-border font-medium"
                                        : "text-brand-muted/30 font-light hover:bg-brand-border/40"
                                    }`}
                                  >
                                    <span>{day}</span>
                                    {isToday && !isSelected && (
                                      <span className="absolute bottom-1 w-1 h-1 bg-brand-orange rounded-full" />
                                    )}
                                  </button>
                                );
                              })}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Preferred Time */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-display font-bold text-brand-dark/80 flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-brand-muted" /> Preferred Time Slot
                      </label>
                      <div className="grid grid-cols-4 gap-2">
                        {BEST_TIME_SLOTS.map((slot) => {
                          const isSelected = formData.preferredTime === slot;
                          return (
                            <button
                              key={slot}
                              type="button"
                              onClick={() => handleSelectTime(slot)}
                              className={`py-2.5 px-1 sm:px-2 text-[10px] sm:text-xs font-sans rounded-xl border text-center transition-all cursor-pointer whitespace-nowrap ${
                                isSelected
                                  ? "bg-brand-orange text-white border-brand-orange font-bold shadow-sm"
                                  : "bg-brand-bg text-brand-dark border-brand-border hover:border-brand-orange/60 font-medium"
                              }`}
                            >
                              {slot}
                            </button>
                          );
                        })}
                      </div>
                      {errors.preferredTime && <span className="text-[11px] font-mono text-red-500 block mt-1">{errors.preferredTime}</span>}
                    </div>
                  </div>

                  {/* Project Details */}
                  <div className="space-y-1.5">
                    <label htmlFor="projectDetails" className="text-xs font-display font-bold text-brand-dark/80">
                      Project Details & Goals
                    </label>
                    <textarea
                      id="projectDetails"
                      name="projectDetails"
                      rows={4}
                      value={formData.projectDetails}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 text-sm bg-brand-bg border rounded-xl outline-hidden focus:border-brand-orange transition-colors resize-none ${
                        errors.projectDetails ? "border-red-500" : "border-brand-border"
                      }`}
                      placeholder="Tell us about your business, your goals, or what you'd like your new website to achieve."
                    />
                    {errors.projectDetails && <span className="text-[11px] font-mono text-red-500">{errors.projectDetails}</span>}
                  </div>

                  {/* Submit Button */}
                  <motion.button
                    type="submit"
                    id="booking-submit-btn"
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    className="w-full py-4 bg-brand-orange text-white font-medium rounded-full flex items-center justify-center gap-2 hover:bg-brand-orange/95 cursor-pointer disabled:opacity-75 transition-all shadow-sm shadow-brand-orange/10"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                        Securing Slot...
                      </span>
                    ) : (
                      <>
                        Request Your Consultation
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </motion.button>
                </motion.form>
              ) : (
                <motion.div
                  key="booking-success"
                  id="booking-success-message"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="py-12 flex flex-col items-center text-center space-y-6"
                >
                  <div className="w-16 h-16 rounded-full bg-brand-orange/10 flex items-center justify-center text-brand-orange">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="font-display text-2xl font-bold text-brand-dark tracking-tight">
                      Consultation Requested Successfully
                    </h3>
                    <p className="text-sm text-brand-muted max-w-md font-light leading-relaxed">
                      Thank you! We've received your business details and slot proposal. Our lead architect will review your project and contact you within 24 hours.
                    </p>
                  </div>

                  <motion.button
                    onClick={() => setIsSuccess(false)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-6 py-2.5 bg-brand-dark text-white text-sm font-medium rounded-full cursor-pointer"
                  >
                    Send Another Request
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Right Column: Copy & Response Time */}
          <div className="lg:col-span-5 flex flex-col justify-between self-stretch py-2">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-brand-orange rounded-full"></span>
                <span className="text-[11px] font-mono font-medium tracking-widest text-brand-dark/80 uppercase">
                  What to Expect
                </span>
              </div>

              <div
                id="response-time-block"
                onClick={() => setShowAdminPanel(!showAdminPanel)}
                className="space-y-4 group cursor-pointer border border-transparent hover:border-brand-border/40 p-4 rounded-2xl transition-all"
                title="Click to view client inquiries (Database Portal)"
              >
                <div className="font-sans text-3xl sm:text-4xl font-bold text-brand-dark tracking-tight leading-tight">
                  A Strategy Call,<br />Not a Sales Call.
                </div>
                <p className="text-brand-muted text-sm sm:text-base leading-relaxed font-light">
                  This isn't a generic consultation. We'll discuss your business goals, identify opportunities, and outline how a high-converting website can help you attract more customers and increase conversions.
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* Database Inquiries Viewer Panel - Highly custom & premium feature */}
        <AnimatePresence>
          {showAdminPanel && (
            <motion.div
              id="admin-database-drawer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="mt-12 p-6 md:p-8 bg-white border border-brand-border rounded-[24px] shadow-sm space-y-6"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Database className="w-5 h-5 text-brand-orange" />
                    <h3 className="font-display text-lg font-bold text-brand-dark">
                      Review Inquiries (Local Database Mirror)
                    </h3>
                  </div>
                  <p className="text-xs text-brand-muted font-light">
                    Every form submission is captured inside standard client-side storage for immediate visual testing.
                  </p>
                </div>
                
                <div className="text-xs font-mono px-3 py-1 bg-brand-bg rounded-lg border border-brand-border text-brand-muted">
                  Total Records: {inquiries.length}
                </div>
              </div>

              {inquiries.length === 0 ? (
                <div className="py-12 border border-dashed border-brand-border rounded-xl text-center text-brand-muted text-sm font-light">
                  No inquiries found. Fill out and submit the form above to record an entry!
                </div>
              ) : (
                <div className="overflow-x-auto border border-brand-border rounded-xl">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-brand-bg text-[10px] font-mono uppercase tracking-wider text-brand-muted border-b border-brand-border">
                        <th className="p-4 font-semibold">Client / Business</th>
                        <th className="p-4 font-semibold">Contact</th>
                        <th className="p-4 font-semibold">Preferred Slot</th>
                        <th className="p-4 font-semibold">Project Details</th>
                        <th className="p-4 font-semibold text-center">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-brand-border text-xs">
                      {inquiries.map((inq) => (
                        <tr key={inq.id} className="hover:bg-brand-bg/50 transition-colors">
                          <td className="p-4">
                            <div className="font-semibold text-brand-dark">{inq.name}</div>
                            <div className="text-[10px] font-mono text-brand-muted">{inq.businessName}</div>
                          </td>
                          <td className="p-4">
                            {inq.email && <div>{inq.email}</div>}
                            <div className="text-brand-muted">{inq.phoneNumber}</div>
                          </td>
                          <td className="p-4">
                            <div className="font-mono">{inq.preferredDate}</div>
                            <div className="text-brand-muted font-mono">{inq.preferredTime}</div>
                          </td>
                          <td className="p-4 max-w-xs truncate" title={inq.projectDetails}>
                            {inq.projectDetails}
                          </td>
                          <td className="p-4 text-center">
                            <button
                              onClick={() => deleteInquiry(inq.id)}
                              className="p-1.5 hover:bg-red-50 hover:text-red-600 rounded-lg text-brand-muted transition-all cursor-pointer"
                              title="Delete Record"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
