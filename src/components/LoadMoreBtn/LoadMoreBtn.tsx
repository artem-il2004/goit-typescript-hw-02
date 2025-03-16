import c from './LoadMoreBtn.module.css'

interface LoadMoreProps {
  onClick: () => void;
}

function LoadMore({onClick } : LoadMoreProps) {
  return (
    <div>
      <button className={c.loadMoreBtn} onClick={onClick}>Load more</button>
    </div>
  )
}

export default LoadMore
