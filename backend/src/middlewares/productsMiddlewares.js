import multer from 'multer'

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, '../public/productsImgs')
    },
    filename: (req, file, cb) => {
        const fileNameOrigim = file.originalname.split(".")
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9) + '.' + fileNameOrigim[1]
        cb(null, file.fieldname + uniqueSuffix)
    },
})
const fileFilter = (req, file, cb) => {
    const isAccepted = ['image/png', 'image/jpg', 'image/jpeg'].find( formatImage => formatImage == file.mimetype)
    if(isAccepted){
        return cb(null, true)
    }

    console.log(file)
    return cb(null, false)
}
export {storage, fileFilter}