// src/components/profile/ProfileAvatarUpload.tsx

import React, { useRef, useState } from "react"
import Avatar from "@/components/shared/Avatar"

const ProfileAvatarUpload: React.FC = () => {
  const fileRef = useRef<HTMLInputElement>(null)
  const [preview, setPreview] = useState<string | null>(null)

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => setPreview(reader.result as string)
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="flex items-center gap-4">
      <Avatar src={preview || "/default-avatar.png"} size="lg" />
      <div className="flex flex-col gap-1">
        <button
          onClick={() => fileRef.current?.click()}
          className="text-sm underline text-primary-600"
        >
          Change Avatar
        </button>
        <input type="file" hidden ref={fileRef} accept="image/*" onChange={handleFile} />
      </div>
    </div>
  )
}

export default ProfileAvatarUpload
