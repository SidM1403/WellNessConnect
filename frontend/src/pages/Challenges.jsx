import PageHeader from '../components/PageHeader.jsx';
import EmptyState from '../components/EmptyState.jsx';
import StatCard from '../components/StatCard.jsx';

const Challenges = () => {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Challenges"
        subtitle="Join gentle community challenges. Wire this to your backend challenge endpoints."
      />
      <div className="grid gap-4 md:grid-cols-3">
        <StatCard label="Active challenges" value="—" hint="Connect to /api/challenges" />
        <StatCard label="Your streaks" value="—" hint="Connect to user challenge stats" accent="sky" />
        <StatCard label="Upcoming" value="—" hint="Populate when backend is ready" />
      </div>
      <EmptyState
        title="No challenges yet"
        message="Display available challenges from your API once implemented."
      />
    </div>
  );
};

export default Challenges;

