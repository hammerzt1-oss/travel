import dynamic from 'next/dynamic'

const PartyGame = dynamic(() => import('@/components/PartyGame'), {
  ssr: false,
  loading: () => <main className="party-shell" />,
})

export default function Home() {
  return <PartyGame />
}
