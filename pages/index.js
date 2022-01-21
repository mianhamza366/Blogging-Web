
import styles from '../styles/Home.module.css'
import Link from 'next/link'
const myBlog = () => {
  return (
    <div className={styles.container}>
      <div className={styles.form}>
        <h1 className={styles.formGroup1}>Welcome to my Bloggs</h1>
        <div className={styles.formGroup1}>
          <h5 className={styles.title}>
            <Link href="/getBlogs">
              <a>View all bloggs</a>

            </Link>
          </h5>
        </div>
        <div className={styles.formGroup1}>
          <h5 className={styles.title}>
            <Link href="/post">
              <a>Create Blogg</a>

            </Link>
          </h5>
        </div>
      </div>
    </div>
    
  );
}
export default myBlog;
