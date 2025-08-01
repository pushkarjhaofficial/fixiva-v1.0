// src/components/profile/ProfileView.tsx

import React from "react"
import ProfileAvatarUpload from "./ProfileAvatarUpload"
import ProfileVerificationCard from "./ProfileVerificationCard"
import ProfileUsageStats from "./ProfileUsageStats"
import ProfileEditForm from "./ProfileEditForm"

const ProfileView: React.FC = () => {
  return (
    <div className="space-y-6 max-w-3xl">
      <h2 className="text-xl font-semibold">My Profile</h2>
      <ProfileAvatarUpload />
      <ProfileVerificationCard />
      <ProfileUsageStats />
      <ProfileEditForm />
    </div>
  )
}

export default ProfileView
