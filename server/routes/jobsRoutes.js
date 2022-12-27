import express from 'express'
import { createJob, deleteJob, getAllJobs, updateJob, showStats } from '../controllers/jobsController.js'

const router = express.Router()
router.post('/', createJob)
router.get('/', getAllJobs)
router.get('/stats', showStats)
router.delete('/:id', deleteJob)
router.patch('/:id', updateJob)


export default router