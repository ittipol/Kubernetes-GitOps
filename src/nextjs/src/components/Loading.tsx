import styles from '@/styles/Loading.module.css'

const Loading = () => {
    return (
        <>
            <div className="flex items-center justify-center h-[500px]">
                <div className={styles.loading}>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </div>

        </>
    ) 
}

export default Loading