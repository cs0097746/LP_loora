import styles from '@/app/v5/v5.module.css';

type ThreadProps = {
  direction?: 'vertical' | 'horizontal';
  active?: boolean;
};

export function Thread({ direction = 'vertical', active = false }: ThreadProps) {
  const vertical = direction === 'vertical';

  return (
    <svg
      className={`${styles.thread} ${active ? styles.threadActive : ''}`}
      viewBox={vertical ? '0 0 12 100' : '0 0 100 12'}
      preserveAspectRatio="none"
      aria-hidden="true"
      focusable="false"
    >
      <path d={vertical ? 'M6 0 V100' : 'M0 6 H100'} vectorEffect="non-scaling-stroke" />
    </svg>
  );
}
