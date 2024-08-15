'use client'
import { useSearchParams } from "next/navigation"
import { TableData } from "../components/TableData"


  
  export default function Page() {
    
    const searchParams = useSearchParams()
    const id = searchParams.get("id")
    
    return (
      <div>
        { id }

      </div>
    )
  }