import path from 'path'
import crypto from 'crypto'
import multer from 'multer'

export const tmpDirectory = path.resolve(__dirname, '..', '..', 'tmp')

export default {
	storage: multer.diskStorage({
		destination: tmpDirectory,
		filename(request, file, callback) {
			const fileHash = crypto.randomBytes(10).toString('hex')
			const fileName = `${fileHash}-${file.originalname}`

			return callback(null, fileName)
		}
	}),
}
