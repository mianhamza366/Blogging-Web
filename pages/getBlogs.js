import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { useState, useEffect } from "react";
import { db } from "./firebase/firebase";
import styles from '../styles/Home.module.css'
import Link from 'next/link'

const getBlogs = () => {
    const [blogs, setBlogs] = useState([]);
    const blogsCollection = collection(db, "blogs")
    const deleteBlog = async (id) => {
        const blogDoc = doc(db, "blogs", id);
        await deleteDoc(blogDoc);
    }

    useEffect(() => {

        const getBloggs = async () => {
            const data = await getDocs(blogsCollection);
            setBlogs(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        }
        getBloggs();

    }, [])
    return (
        <div className={styles.main}>
            <div>
                <h5 className={styles.title}>
                    <Link href="/post">
                        <a>Create blogg</a>

                    </Link>
                </h5>
            </div>
            <h1>All blogs</h1>
            {blogs.map((blog) => {
                return (
                    <div className={styles.form}>
                        <div className={styles.form1}>
                            <h2>{blog.title}</h2>
                            <h3>{blog.description}</h3>
                            <h4>{blog.content}</h4>
                            <h6>{blog.time}</h6>
                            <button className={styles.button1} onClick={() => { deleteBlog(blog.id) }}>Delete Blogg</button>
                        </div>
                        <img className={styles.image} src={blog.url}></img>
                    </div>
                )
            })}
        </div>
    );
}
export default getBlogs;