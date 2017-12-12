import { VoteComponent } from './vote.component';

describe('VoteComponent', () => {
  var component: VoteComponent;

  beforeEach(() => {
    component = new VoteComponent();
  });

  it('Should raise voteChanged event when upvoted', () => {
    let totalVote = null;
    component.voteChanged.subscribe(tv => totalVote = tv );
    component.upVote();
    // expect(totalVote).not.toBeNull();
    expect(totalVote).toBe(1);
  });
});
