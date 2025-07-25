import React, { useEffect } from 'react'
import FileInput from '../../../../../Components/FileInput'

const Image = ({product,setProduct}) => {
useEffect(()=>{
  console.log(product)
},[product.image])
  return (
    <div className="flex flex-col gap-4 w-full">
      <FileInput
        label="Ürün Resmi"
        onChange={(e)=>setProduct((prev)=>({...prev,image:e.target.files[0]}))}
        placeholder="Ürün resmini giriniz"
      />
    </div>
  )
}

export default Image