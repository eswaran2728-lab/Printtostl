'use client'
import { useCallback, useState } from 'react'
import { Upload, X } from 'lucide-react'
import { cn } from '@/lib/utils'

interface UploadZoneProps {
  label: string
  onFileSelect?: (file: File) => void
  className?: string
}

export function UploadZone({ label, onFileSelect, className }: UploadZoneProps) {
  const [preview, setPreview] = useState<string | null>(null)
  const [dragging, setDragging] = useState(false)

  const handleFile = useCallback((file: File) => {
    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) return
    const url = URL.createObjectURL(file)
    setPreview(url)
    onFileSelect?.(file)
  }, [onFileSelect])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setDragging(false)
    const file = e.dataTransfer.files[0]
    if (file) handleFile(file)
  }, [handleFile])

  return (
    <div
      onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
      onDragLeave={() => setDragging(false)}
      onDrop={handleDrop}
      className={cn(
        'upload-zone rounded-xl p-6 text-center cursor-pointer relative overflow-hidden',
        dragging && 'border-gold bg-gold/5',
        className
      )}
    >
      <input
        type="file"
        accept="image/jpeg,image/png,image/webp"
        className="absolute inset-0 opacity-0 cursor-pointer"
        onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
      />
      {preview ? (
        <div className="relative">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={preview} alt="preview" className="w-full h-40 object-cover rounded-lg" />
          <button
            onClick={(e) => { e.stopPropagation(); setPreview(null) }}
            className="absolute top-2 right-2 bg-black/70 text-white rounded-full p-1 hover:bg-red-500 transition-colors"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      ) : (
        <div className="py-6">
          <Upload className="w-8 h-8 text-gold/50 mx-auto mb-3" />
          <p className="text-sm font-medium text-gray-300">{label}</p>
          <p className="text-xs text-gray-500 mt-1">JPG, PNG, WEBP • Drag & drop or click</p>
        </div>
      )}
    </div>
  )
}
