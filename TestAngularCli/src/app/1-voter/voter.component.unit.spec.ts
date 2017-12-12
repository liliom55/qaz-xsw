import { VoterComponent } from './voter.component';

describe('VoterComponent', () => {
  var component: VoterComponent;

  beforeEach(() => {
    component = new VoterComponent();
    // if there is a dependency ->
    // component = new VoterComponent(new TodoService())
  });

  it('should increase total votes when I click the upvote button', () => {
    component.myVote = 0;
    component.upVote();
    expect(component.myVote).toBe(1);
  });
});
