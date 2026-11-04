'use client'

import TemaComponent from "@/components/TemaComponent"
import { useState } from "react"

export default function DemoStateBiasa() {

    const [temaGelap, setTemaGelap] = useState(false)

    return (
        <div style={{
            backgroundColor: temaGelap ? '#0f172a' : '#f8fafc',
            color: temaGelap ? '#f8fafc' : '#0f172a',
            minHeight: '100vh',
            transition: 'all 0.3s ease'
        }}>
            <TemaComponent setTemaGelap={setTemaGelap} temaGelap={temaGelap} />
        </div>
    )
}