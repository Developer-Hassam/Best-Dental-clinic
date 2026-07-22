import React, { useState, useRef, useEffect } from 'react'

export interface ImageFileMeta {
  url: string
  name: string
  format: string
  sizeMb: string
  resolution: string
  rawFile?: File
}

interface ImageUploadProps {
  label?: string
  value?: string | ImageFileMeta | null
  onChange?: (val: ImageFileMeta | null) => void
  placeholder?: string
  accept?: string
  aspectRatio?: 'square' | 'video' | 'banner' | 'auto'
  className?: string
  helpText?: string
}

export function ImageUpload({
  label,
  value,
  onChange,
  placeholder = "Drag & drop your image here, or click to browse",
  accept = "image/png, image/jpeg, image/webp, image/gif, image/svg+xml",
  aspectRatio = 'auto',
  className = "",
  helpText = "Supports PNG, JPG, WEBP up to 10MB"
}: ImageUploadProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [fileMeta, setFileMeta] = useState<ImageFileMeta | null>(null)
  const [isLightboxOpen, setIsLightboxOpen] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Initialize or update internal state when `value` prop changes
  useEffect(() => {
    if (!value) {
      setFileMeta(null)
      return
    }

    if (typeof value === 'string') {
      // Create initial metadata for pre-filled URL strings
      const name = value.split('/').pop()?.split('?')[0] || 'Image_file.png'
      const ext = name.split('.').pop()?.toUpperCase() || 'PNG'
      
      const img = new Image()
      img.onload = () => {
        setFileMeta({
          url: value,
          name: name.length > 25 ? name.substring(0, 22) + '...' + ext.toLowerCase() : name,
          format: ext,
          sizeMb: '1.25 MB', // Estimated for remote URL
          resolution: `${img.naturalWidth} × ${img.naturalHeight} px`
        })
      }
      img.onerror = () => {
        setFileMeta({
          url: value,
          name: name,
          format: ext,
          sizeMb: '1.20 MB',
          resolution: 'Standard Resolution'
        })
      }
      img.src = value
    } else {
      setFileMeta(value)
    }
  }, [value])

  const processFile = (file: File) => {
    if (!file.type.startsWith('image/')) return

    const format = file.type.split('/')[1]?.toUpperCase() || 'IMAGE'
    const sizeMb = (file.size / (1024 * 1024)).toFixed(2) + ' MB'
    const objectUrl = URL.createObjectURL(file)

    const img = new Image()
    img.onload = () => {
      const meta: ImageFileMeta = {
        url: objectUrl,
        name: file.name,
        format: format,
        sizeMb: sizeMb,
        resolution: `${img.naturalWidth} × ${img.naturalHeight} px`,
        rawFile: file
      }
      setFileMeta(meta)
      if (onChange) onChange(meta)
    }
    img.src = objectUrl
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files[0]) {
      processFile(files[0])
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
    const files = e.dataTransfer.files
    if (files && files[0]) {
      processFile(files[0])
    }
  }

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation()
    setFileMeta(null)
    if (fileInputRef.current) fileInputRef.current.value = ''
    if (onChange) onChange(null)
  }

  const triggerBrowse = () => {
    fileInputRef.current?.click()
  }

  // Aspect ratio helper classes
  const aspectClasses = {
    square: 'aspect-square',
    video: 'aspect-video',
    banner: 'aspect-[3/1]',
    auto: 'min-h-[140px]'
  }[aspectRatio]

  return (
    <div className={`space-y-1.5 ${className}`}>
      {label && (
        <label className="block text-slate-700 text-sm font-medium">
          {label}
        </label>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        onChange={handleFileSelect}
        className="hidden"
      />

      {!fileMeta ? (
        // --- Drag & Drop Dropzone State ---
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={triggerBrowse}
          className={`relative border-2 border-dashed rounded-xl p-5 text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-2.5 ${aspectClasses} ${
            isDragging
              ? 'border-teal-500 bg-teal-50/70 ring-4 ring-teal-500/10'
              : 'border-slate-200 hover:border-teal-400 bg-white hover:bg-slate-50/80 shadow-2xs'
          }`}
        >
          <div className="w-10 h-10 rounded-full bg-teal-50 flex items-center justify-center text-teal-600 group-hover:scale-110 transition-transform">
            <svg viewBox="0 0 24 24" className="w-5 h-5 fill-none stroke-current stroke-2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="17 8 12 3 7 8" />
              <line x1="12" y1="3" x2="12" y2="15" />
            </svg>
          </div>
          <div>
            <p className="text-slate-800 text-sm font-semibold mb-0.5">
              {isDragging ? "Drop your image file here" : "Upload Image"}
            </p>
            <p className="text-slate-500 text-xs max-w-xs leading-relaxed">
              {placeholder}
            </p>
          </div>
          {helpText && (
            <span className="text-[11px] text-slate-400 font-normal">
              {helpText}
            </span>
          )}
        </div>
      ) : (
        // --- Uploaded File Active Preview State ---
        <div className="border border-slate-200 bg-white rounded-xl p-3.5 shadow-2xs space-y-3">
          <div className="flex gap-3.5 items-start">
            {/* Image Thumbnail */}
            <div className="relative w-20 h-20 rounded-lg overflow-hidden border border-slate-100 bg-slate-100 shrink-0 group">
              <img
                src={fileMeta.url}
                alt={fileMeta.name}
                className="w-full h-full object-cover"
              />
              <button
                type="button"
                onClick={() => setIsLightboxOpen(true)}
                className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white"
                title="View Full Image"
              >
                <svg viewBox="0 0 24 24" className="w-5 h-5 stroke-white fill-none stroke-2">
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  <line x1="11" y1="8" x2="11" y2="14" />
                  <line x1="8" y1="11" x2="14" y2="11" />
                </svg>
              </button>
            </div>

            {/* File Metadata Details */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2 mb-1">
                <p className="text-slate-900 text-sm font-semibold truncate" title={fileMeta.name}>
                  {fileMeta.name}
                </p>
                <span className="px-2 py-0.5 rounded-md bg-teal-50 text-teal-700 text-[10px] font-bold tracking-wide uppercase border border-teal-100/80">
                  {fileMeta.format}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-x-2 gap-y-1 text-xs text-slate-500 mt-1.5">
                <div className="flex items-center gap-1.5">
                  <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 text-slate-400 fill-none stroke-2 stroke-current">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                    <circle cx="8.5" cy="8.5" r="1.5" />
                    <polyline points="21 15 16 10 5 21" />
                  </svg>
                  <span>{fileMeta.resolution}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 text-slate-400 fill-none stroke-2 stroke-current">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                  </svg>
                  <span>{fileMeta.sizeMb}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 mt-3 pt-2.5 border-t border-slate-100">
                <button
                  type="button"
                  onClick={triggerBrowse}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-teal-700 hover:text-teal-800 bg-teal-50 hover:bg-teal-100 px-2.5 py-1 rounded-md transition-colors cursor-pointer"
                >
                  <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-none stroke-2 stroke-current">
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                  </svg>
                  Change Image
                </button>
                <button
                  type="button"
                  onClick={() => setIsLightboxOpen(true)}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-slate-600 hover:text-slate-800 bg-slate-100 hover:bg-slate-200 px-2.5 py-1 rounded-md transition-colors cursor-pointer"
                >
                  <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-none stroke-2 stroke-current">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                  View Full
                </button>
                <button
                  type="button"
                  onClick={handleRemove}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-rose-600 hover:text-rose-700 bg-rose-50 hover:bg-rose-100 px-2.5 py-1 rounded-md transition-colors cursor-pointer ml-auto"
                >
                  <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-none stroke-2 stroke-current">
                    <polyline points="3 6 5 6 21 6" />
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                  </svg>
                  Remove
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* --- Full Image Lightbox Modal --- */}
      {isLightboxOpen && fileMeta && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
          <div className="relative max-w-4xl w-full bg-white rounded-2xl overflow-hidden shadow-2xl border border-slate-800/20 flex flex-col max-h-[90vh]">
            {/* Modal Header */}
            <div className="px-5 py-3.5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <div className="flex items-center gap-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-teal-500" />
                <h4 className="font-semibold text-slate-900 text-sm truncate max-w-md">
                  {fileMeta.name}
                </h4>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs text-slate-500 font-mono">
                  {fileMeta.resolution} • {fileMeta.sizeMb}
                </span>
                <button
                  type="button"
                  onClick={() => setIsLightboxOpen(false)}
                  className="w-8 h-8 rounded-lg bg-slate-200/80 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-colors cursor-pointer"
                  aria-label="Close modal"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Modal Body / Image View */}
            <div className="p-4 bg-slate-900 flex-1 flex items-center justify-center overflow-auto min-h-[300px]">
              <img
                src={fileMeta.url}
                alt={fileMeta.name}
                className="max-h-[70vh] w-auto max-w-full object-contain rounded-lg shadow-lg"
              />
            </div>

            {/* Modal Footer */}
            <div className="px-5 py-3 border-t border-slate-100 bg-white flex items-center justify-between text-xs text-slate-500">
              <p>Format: <strong className="text-slate-800">{fileMeta.format}</strong></p>
              <button
                type="button"
                onClick={() => setIsLightboxOpen(false)}
                className="px-4 py-1.5 bg-slate-900 hover:bg-slate-800 text-white font-medium rounded-lg transition-colors cursor-pointer"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
