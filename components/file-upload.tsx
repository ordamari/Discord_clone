'use-client'

import { UploadDropzone } from '@/lib/uploadthing'
import { X } from 'lucide-react'
import Image from 'next/image'
import '@uploadthing/react/styles.css'
import { useMemo } from 'react'

type FileUploadProps = {
    onChange: (url?: string) => void
    value: string
    endpoint: 'serverImage' | 'messageFile'
}

export const FileUpload = ({ onChange, value, endpoint }: FileUploadProps) => {
    const fileType = useMemo(() => {
        return value?.split('.').pop()
    }, [value])

    if (value && fileType !== 'pdf')
        return (
            <div className="relative h-20 w-20">
                <Image
                    fill
                    src={value}
                    alt="Uploaded image"
                    className="rounded-full"
                />
                <button
                    type="button"
                    className="bg-rose-500 text-white p-1 rounded-full absolute top-0 right-0 shadow-sm"
                >
                    <X className="h-4 w-4" />
                </button>
            </div>
        )

    return (
        <UploadDropzone
            onClientUploadComplete={(res) => {
                onChange(res?.[0].url)
            }}
            onUploadError={(err) => {
                console.log(err)
            }}
            endpoint={endpoint}
        />
    )
}
