import CompelLogo from '@/components/CompelLogo';

export default function WatchNotFound() {
  return <main className="watch-root watch-unavailable">
    <CompelLogo width={105} />
    <h1>This video is unavailable.</h1>
    <p>Ask the sender for an active link.</p>
  </main>;
}
