import Sidebar from './components/sidebar'
import styles from './App.module.css'
import Middle from './components/middle'
import Playcard from './components/playcard'

function App() {
  return (
    <div className={styles.main}>
      <div className={styles.sidebar}>
        <Sidebar />
      </div>
      <div className={styles.middle}>
        <Middle />
      </div>
      <div className={styles.playcard}>
        <Playcard />
      </div>
    </div>
  )
}

export default App
