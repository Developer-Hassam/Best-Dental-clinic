import React, { useState } from 'react'
import { ImageUpload, ImageFileMeta } from './ImageUpload'
import { siteConfig } from '../siteConfig'

// Common Drawer Container
function Drawer({
  isOpen,
  onClose,
  title,
  subtitle,
  children
}: {
  isOpen: boolean
  onClose: () => void
  title: string
  subtitle?: string
  children: React.ReactNode
}) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-950/60 backdrop-blur-xs flex justify-end animate-fadeIn">
      <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col border-l border-slate-100 animate-slideLeft">
        {/* Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/80">
          <div>
            <h3 className="font-bold text-slate-900 text-lg leading-snug">{title}</h3>
            {subtitle && <p className="text-slate-500 text-xs mt-0.5">{subtitle}</p>}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-slate-200/70 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-colors cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-5">
          {children}
        </div>
      </div>
    </div>
  )
}

// Common Modal Container
function Modal({
  isOpen,
  onClose,
  title,
  subtitle,
  children
}: {
  isOpen: boolean
  onClose: () => void
  title: string
  subtitle?: string
  children: React.ReactNode
}) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-white rounded-2xl max-w-xl w-full shadow-2xl border border-slate-100 overflow-hidden animate-scaleUp">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/80">
          <div>
            <h3 className="font-bold text-slate-900 text-lg leading-snug">{title}</h3>
            {subtitle && <p className="text-slate-500 text-xs mt-0.5">{subtitle}</p>}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-slate-200/70 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-colors cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-5 max-h-[75vh] overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  )
}

// -------------------------------------------------------------
// 1. EDIT USER PROFILE DRAWER
// -------------------------------------------------------------
export function EditUserProfileDrawer({
  isOpen,
  onClose
}: {
  isOpen: boolean
  onClose: () => void
}) {
  const [profilePic, setProfilePic] = useState<ImageFileMeta | string | null>(siteConfig.doctor.photo)
  const [doctorName, setDoctorName] = useState(siteConfig.doctor.name)
  const [doctorTitle, setDoctorTitle] = useState(siteConfig.doctor.title)
  const [saved, setSaved] = useState(false)

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    setSaved(true)
    setTimeout(() => {
      setSaved(false)
      onClose()
    }, 1200)
  }

  return (
    <Drawer isOpen={isOpen} onClose={onClose} title="Edit User Profile" subtitle="Update practitioner profile & photo">
      <form onSubmit={handleSave} className="space-y-4">
        {saved && (
          <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold rounded-xl flex items-center gap-2">
            ✓ User profile updated successfully!
          </div>
        )}

        {/* PROFILE PICTURE IMAGE UPLOAD FIELD */}
        <ImageUpload
          label="Profile Picture"
          value={profilePic}
          onChange={setProfilePic}
          placeholder="Upload doctor / staff profile portrait"
          aspectRatio="square"
        />

        <div>
          <label className="block text-slate-700 text-xs font-medium mb-1">Doctor / Staff Name</label>
          <input
            type="text"
            value={doctorName}
            onChange={(e) => setDoctorName(e.target.value)}
            className="w-full border border-slate-200 bg-white rounded-xl px-3.5 py-2.5 text-slate-800 text-sm focus:outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-50"
          />
        </div>

        <div>
          <label className="block text-slate-700 text-xs font-medium mb-1">Professional Title</label>
          <input
            type="text"
            value={doctorTitle}
            onChange={(e) => setDoctorTitle(e.target.value)}
            className="w-full border border-slate-200 bg-white rounded-xl px-3.5 py-2.5 text-slate-800 text-sm focus:outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-50"
          />
        </div>

        <div className="pt-4 border-t border-slate-100 flex gap-2">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 px-4 py-2.5 border border-slate-200 text-slate-700 font-medium rounded-xl text-sm hover:bg-slate-50 cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="flex-1 px-4 py-2.5 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-xl text-sm shadow-xs cursor-pointer"
          >
            Save Profile
          </button>
        </div>
      </form>
    </Drawer>
  )
}

// -------------------------------------------------------------
// 2. MANAGE TESTIMONIALS MODAL/DRAWER
// -------------------------------------------------------------
export function ManageTestimonialsModal({
  isOpen,
  onClose
}: {
  isOpen: boolean
  onClose: () => void
}) {
  const [avatar, setAvatar] = useState<ImageFileMeta | string | null>(null)
  const [patientName, setPatientName] = useState('')
  const [area, setArea] = useState('')
  const [reviewText, setReviewText] = useState('')
  const [saved, setSaved] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSaved(true)
    setTimeout(() => {
      setSaved(false)
      onClose()
    }, 1200)
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add New Testimonial" subtitle="Publish patient reviews & avatar photos">
      <form onSubmit={handleSubmit} className="space-y-4">
        {saved && (
          <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold rounded-xl flex items-center gap-2">
            ✓ New testimonial added successfully!
          </div>
        )}

        {/* USER IMAGE / AVATAR UPLOAD FIELD */}
        <ImageUpload
          label="User Image / Avatar"
          value={avatar}
          onChange={setAvatar}
          placeholder="Upload patient avatar photo"
          aspectRatio="square"
        />

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-slate-700 text-xs font-medium mb-1">Patient Name</label>
            <input
              type="text"
              required
              placeholder="e.g. Fatima Noor"
              value={patientName}
              onChange={(e) => setPatientName(e.target.value)}
              className="w-full border border-slate-200 bg-white rounded-xl px-3.5 py-2.5 text-slate-800 text-sm focus:outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-50"
            />
          </div>
          <div>
            <label className="block text-slate-700 text-xs font-medium mb-1">Location / Area</label>
            <input
              type="text"
              placeholder="e.g. Model Town"
              value={area}
              onChange={(e) => setArea(e.target.value)}
              className="w-full border border-slate-200 bg-white rounded-xl px-3.5 py-2.5 text-slate-800 text-sm focus:outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-50"
            />
          </div>
        </div>

        <div>
          <label className="block text-slate-700 text-xs font-medium mb-1">Review Description</label>
          <textarea
            rows={3}
            required
            placeholder="Write the patient's review text here..."
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            className="w-full border border-slate-200 bg-white rounded-xl px-3.5 py-2.5 text-slate-800 text-sm focus:outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-50 resize-none"
          />
        </div>

        <div className="pt-3 border-t border-slate-100 flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border border-slate-200 text-slate-700 font-medium rounded-xl text-sm hover:bg-slate-50 cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-5 py-2 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-xl text-sm shadow-xs cursor-pointer"
          >
            Add Testimonial
          </button>
        </div>
      </form>
    </Modal>
  )
}

// -------------------------------------------------------------
// 3. MANAGE BANNER SLIDERS MODAL/DRAWER
// -------------------------------------------------------------
export function ManageBannerSlidersModal({
  isOpen,
  onClose
}: {
  isOpen: boolean
  onClose: () => void
}) {
  const [bannerImage, setBannerImage] = useState<ImageFileMeta | string | null>("https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=1200&h=400&fit=crop&auto=format")
  const [title, setTitle] = useState("Special Dental Offer: 20% Off Teeth Whitening")
  const [saved, setSaved] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSaved(true)
    setTimeout(() => {
      setSaved(false)
      onClose()
    }, 1200)
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Manage Banner Sliders" subtitle="Upload hero & promo campaign banners">
      <form onSubmit={handleSubmit} className="space-y-4">
        {saved && (
          <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold rounded-xl flex items-center gap-2">
            ✓ Banner slider saved & published!
          </div>
        )}

        {/* BANNER IMAGE UPLOAD FIELD */}
        <ImageUpload
          label="Banner Image"
          value={bannerImage}
          onChange={setBannerImage}
          placeholder="Upload high-res banner image (1200 x 400 recommended)"
          aspectRatio="banner"
          helpText="Supports wide promotional images up to 10MB"
        />

        <div>
          <label className="block text-slate-700 text-xs font-medium mb-1">Banner Title / Campaign Name</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border border-slate-200 bg-white rounded-xl px-3.5 py-2.5 text-slate-800 text-sm focus:outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-50"
          />
        </div>

        <div className="pt-3 border-t border-slate-100 flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border border-slate-200 text-slate-700 font-medium rounded-xl text-sm hover:bg-slate-50 cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-5 py-2 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-xl text-sm shadow-xs cursor-pointer"
          >
            Save Banner
          </button>
        </div>
      </form>
    </Modal>
  )
}

// -------------------------------------------------------------
// 4. EDIT BRAND / DENTAL LAB DRAWER
// -------------------------------------------------------------
export function EditBrandLabDrawer({
  isOpen,
  onClose
}: {
  isOpen: boolean
  onClose: () => void
}) {
  const [logo, setLogo] = useState<ImageFileMeta | string | null>(null)
  const [labName, setLabName] = useState('Apex Ceramic Dental Lab')
  const [contactPerson, setContactPerson] = useState('Engr. Tariq Mehmood')
  const [saved, setSaved] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSaved(true)
    setTimeout(() => {
      setSaved(false)
      onClose()
    }, 1200)
  }

  return (
    <Drawer isOpen={isOpen} onClose={onClose} title="Edit Brand / Dental Lab" subtitle="Partner lab & brand logo settings">
      <form onSubmit={handleSubmit} className="space-y-4">
        {saved && (
          <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold rounded-xl flex items-center gap-2">
            ✓ Partner Dental Lab details updated!
          </div>
        )}

        {/* BRAND / LAB LOGO UPLOAD FIELD */}
        <ImageUpload
          label="Brand / Lab Logo"
          value={logo}
          onChange={setLogo}
          placeholder="Upload partner lab or brand logo (PNG / SVG)"
          aspectRatio="square"
        />

        <div>
          <label className="block text-slate-700 text-xs font-medium mb-1">Dental Lab / Brand Name</label>
          <input
            type="text"
            value={labName}
            onChange={(e) => setLabName(e.target.value)}
            className="w-full border border-slate-200 bg-white rounded-xl px-3.5 py-2.5 text-slate-800 text-sm focus:outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-50"
          />
        </div>

        <div>
          <label className="block text-slate-700 text-xs font-medium mb-1">Contact Person / Technician</label>
          <input
            type="text"
            value={contactPerson}
            onChange={(e) => setContactPerson(e.target.value)}
            className="w-full border border-slate-200 bg-white rounded-xl px-3.5 py-2.5 text-slate-800 text-sm focus:outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-50"
          />
        </div>

        <div className="pt-4 border-t border-slate-100 flex gap-2">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 px-4 py-2.5 border border-slate-200 text-slate-700 font-medium rounded-xl text-sm hover:bg-slate-50 cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="flex-1 px-4 py-2.5 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-xl text-sm shadow-xs cursor-pointer"
          >
            Save Lab Info
          </button>
        </div>
      </form>
    </Drawer>
  )
}

// -------------------------------------------------------------
// 5. TREATMENT PLAN MODAL
// -------------------------------------------------------------
export function TreatmentPlanModal({
  isOpen,
  onClose
}: {
  isOpen: boolean
  onClose: () => void
}) {
  const [attachment, setAttachment] = useState<ImageFileMeta | string | null>("https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=800&h=600&fit=crop&auto=format")
  const [planTitle, setPlanTitle] = useState('Clear Aligner & Smile Design Plan')
  const [cost, setCost] = useState('Rs. 45,000')
  const [saved, setSaved] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSaved(true)
    setTimeout(() => {
      setSaved(false)
      onClose()
    }, 1200)
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Treatment Plan & Attachments" subtitle="Attach diagnostic scans & plan documents">
      <form onSubmit={handleSubmit} className="space-y-4">
        {saved && (
          <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold rounded-xl flex items-center gap-2">
            ✓ Treatment plan attached & saved!
          </div>
        )}

        <div>
          <label className="block text-slate-700 text-xs font-medium mb-1">Treatment Plan Name</label>
          <input
            type="text"
            value={planTitle}
            onChange={(e) => setPlanTitle(e.target.value)}
            className="w-full border border-slate-200 bg-white rounded-xl px-3.5 py-2.5 text-slate-800 text-sm focus:outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-50"
          />
        </div>

        {/* TREATMENT PLAN / ATTACHMENT IMAGE UPLOAD FIELD */}
        <ImageUpload
          label="Treatment Plan / Attachment Image"
          value={attachment}
          onChange={setAttachment}
          placeholder="Upload treatment plan scan, chart diagram, or clinical report image"
          aspectRatio="video"
        />

        <div>
          <label className="block text-slate-700 text-xs font-medium mb-1">Estimated Cost / Investment</label>
          <input
            type="text"
            value={cost}
            onChange={(e) => setCost(e.target.value)}
            className="w-full border border-slate-200 bg-white rounded-xl px-3.5 py-2.5 text-slate-800 text-sm focus:outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-50"
          />
        </div>

        <div className="pt-3 border-t border-slate-100 flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border border-slate-200 text-slate-700 font-medium rounded-xl text-sm hover:bg-slate-50 cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-5 py-2 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-xl text-sm shadow-xs cursor-pointer"
          >
            Attach & Save Plan
          </button>
        </div>
      </form>
    </Modal>
  )
}

// -------------------------------------------------------------
// 6. PATIENT DENTAL CHARTING PAGE / MODAL
// -------------------------------------------------------------
export function PatientDentalChartingModal({
  isOpen,
  onClose
}: {
  isOpen: boolean
  onClose: () => void
}) {
  const [xrayImage, setXrayImage] = useState<ImageFileMeta | string | null>("https://images.unsplash.com/photo-1609840114035-3c981b782dfe?w=800&h=600&fit=crop&auto=format")
  const [patientId, setPatientId] = useState('PT-2026-884')
  const [notes, setNotes] = useState('Periapical radiograph shows tooth #16 distal caries extending near pulp. Recommended root canal & crown.')
  const [saved, setSaved] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSaved(true)
    setTimeout(() => {
      setSaved(false)
      onClose()
    }, 1200)
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Patient Dental Charting & X-Ray" subtitle="Upload & inspect OPG, periapical, and intraoral scans">
      <form onSubmit={handleSubmit} className="space-y-4">
        {saved && (
          <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold rounded-xl flex items-center gap-2">
            ✓ Dental X-Ray & Charting record saved to patient file!
          </div>
        )}

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-slate-700 text-xs font-medium mb-1">Patient ID / Record No.</label>
            <input
              type="text"
              value={patientId}
              onChange={(e) => setPatientId(e.target.value)}
              className="w-full border border-slate-200 bg-white rounded-xl px-3.5 py-2.5 text-slate-800 text-sm focus:outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-50"
            />
          </div>
          <div>
            <label className="block text-slate-700 text-xs font-medium mb-1">Scan Type</label>
            <select className="w-full border border-slate-200 bg-white rounded-xl px-3.5 py-2.5 text-slate-800 text-sm focus:outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-50">
              <option>OPG Digital Panoramic X-Ray</option>
              <option>Periapical Radiograph</option>
              <option>Intraoral Photo Scan</option>
            </select>
          </div>
        </div>

        {/* UPLOAD DENTAL X-RAY / IMAGE FIELD */}
        <ImageUpload
          label="Upload Dental X-Ray / Image"
          value={xrayImage}
          onChange={setXrayImage}
          placeholder="Upload OPG X-Ray, Periapical scan, or Intraoral photo"
          aspectRatio="video"
          helpText="Supports DICOM/PNG/JPG radiography files up to 15MB"
        />

        <div>
          <label className="block text-slate-700 text-xs font-medium mb-1">Clinical Diagnostic Notes</label>
          <textarea
            rows={3}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full border border-slate-200 bg-white rounded-xl px-3.5 py-2.5 text-slate-800 text-sm focus:outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-50 resize-none"
          />
        </div>

        <div className="pt-3 border-t border-slate-100 flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border border-slate-200 text-slate-700 font-medium rounded-xl text-sm hover:bg-slate-50 cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-5 py-2 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-xl text-sm shadow-xs cursor-pointer"
          >
            Save Charting Record
          </button>
        </div>
      </form>
    </Modal>
  )
}
