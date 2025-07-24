import React from 'react'
import FileInput from '../../../../../Components/FileInput'
import Button from '../../../../../Components/Button'

const Logo = () => {
  return (
    <div className="w-full flex flex-col items-start justify-start gap-4">
      <FileInput
        label="Logo"
        name="logo"
        accept="image/*"
      />
      <div className="w-full flex items-center justify-end">
        <Button>Kaydet</Button>
      </div>
    </div>
  )
}

export default Logo