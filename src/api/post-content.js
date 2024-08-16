import {db} from '../utils/db'
import { content_component } from '../models/schema'

export default async function PostContent(data){
    await db.insert(content_component).values(data)
}