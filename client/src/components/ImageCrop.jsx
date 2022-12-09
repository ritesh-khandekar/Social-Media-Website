import React from 'react'
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import { useState } from 'react';
import { motion } from "framer-motion"
import './imagecrop.css'

const ImageCrop = ({ image, setCropData, setVisibleCropper }) => {

    const [cropper, setCropper] = useState();

    const cropImage = (e) => {
        if (typeof cropper !== "undefined") {
            setCropData(cropper.getCroppedCanvas().toDataURL())
            setVisibleCropper(false)
        }
    }

    return <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ left: 0, zIndex: 10, width:"100%" }} className="preview-container">
        {/* <img className="img-preview" alt='Cropper layout' /> */}
        <Cropper
            initialAspectRatio={1}
            preview=".img-preview"
            src={image}
            viewMode={1}
            minCropBoxHeight={10}
            minCropBoxWidth={10}
            background={false}
            responsive={true}
            autoCropArea={1}
            cropBoxResizable={false}
            checkOrientation={false}
            onInitialized={(instance) => {
                setCropper(instance);
            }}
            guides={false}
            className='cropper-layout'
        />
        <button className="crop-img-btn" onClick={cropImage}>Crop Image and Upload</button>
    </motion.div>
}

export default ImageCrop