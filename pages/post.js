import styles from '../styles/Home.module.css'
import { collection, getDocs, addDoc, deleteDoc } from "firebase/firestore";
import { useState, useEffect } from "react";
import { db } from "./firebase/firebase";
import Link from 'next/link'
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
const post = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [content, setContent] = useState("");
    const [url, setUrl]= useState("");
    const [progress, setProgress] = useState(0)
    const blogCollection = collection(db, "blogs");
    const storage = getStorage();

    const handleChange=e=>{
        const file=(e.target.files[0]);
        handleUpload(file);

    }
    const handleUpload=(file)=>{
        const imageRef = ref(storage, `/files/${file.name}`);
        const uploadTask= uploadBytesResumable(imageRef,file) 
        uploadTask.on(
            "state_changed",
             (snapshot) => {
              const prog = Math.round(
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100
              );
              setProgress(prog);
            },
            (err) => console.log(err),
            () => {
              getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                console.log(url)  
                setUrl(url)});
            }
          ); 
    }

    const createBlog = async () => {
        var today = new Date()
        await addDoc(blogCollection, { title: title, description: description, content: content, url: url, time: today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds() });
    }

    return (
        <div className={styles.container}>
            <div className={styles.form}>
                <div className={styles.formGroup}>
                    <label><h3>Title</h3></label>
                    <input type="text"
                        placeholder="Add title"
                        onChange={(e) => { setTitle(e.target.value) }}
                    />
                </div>
                <div className={styles.formGroup}>
                    <label><h3>Description</h3></label>
                    <textarea
                        placeholder="Add description"
                        onChange={(e) => { setDescription(e.target.value) }}
                    />
                </div>
                <div className={styles.formGroup}>
                    <label><h3>Content</h3></label>
                    <textarea
                        placeholder="Add content"
                        onChange={(e) => { setContent(e.target.value) }}
                    />
                </div>
                <div className={styles.formGroup}>
                    <input  type="file" onChange={handleChange}></input>
                    <h6>Uploading ... {progress} %</h6>
                </div>
                <div className={styles.formGroup}>
                    <button className={styles.button} type="submit" onClick={createBlog}>Create Blog</button>
                </div>
            </div>
            <div>
                <h5 className={styles.title}>
                    <Link href="/getBlogs">
                        <a>Get All bloggs</a>

                    </Link>
                </h5>
            </div>
        </div >

    );
}
export default post;