import React, {Component, PropTypes} from 'react';
import UserPhoto from './UserPhoto';
import moment from 'moment';

export default class UserCard extends Component {
  static propTypes = { user: PropTypes.object };

  static defaultProps = {
    user: {
      avatar: '/static/images/default_avatar.svg',
      name: '',
      role: '',
      tier: '',
      totalDonations: 0,
      twitterHandle: '',
      website: ''
    }
  };

  _link(href, children) {
    if (href) {
      return (<a href={href} className='inline-block align-top'>{children}</a>);
    }

    return children;
  }

  render() {
    const { className = '', user } = this.props;
    const twitterUrl = (user.twitterHandle) ? `https://twitter.com/${user.twitterHandle}` : '';
    const href = (user.website || twitterUrl);
    let roleLabel = (user.tier || user.role).toLowerCase();
    let addBadge = false;

    if (roleLabel === 'sponsor') {
      roleLabel = 'Official Sponsor';
    } else if (roleLabel !== 'member') {
      addBadge = true;
    }

    return (
      <article className={`UserCard bg-white pt3 ${className} ${user.tier}`}>
        {this._link(href, <UserPhoto url={user.avatar} addBadge={addBadge} className='mx-auto' />)}
        <p className='UserCard-name h5 mt2 mb1 px2 -ff-sec'>{this._link(href, user.name)}</p>
        <div className='border-top border-gray px3 py1'>
          <p className='UserCard-role m0 -green -fw-bold -ttu'>{roleLabel}</p>
          <p className='h6 muted m0'>since {moment(user.createdAt).format('MMMM YYYY')}</p>
        </div>
      </article>
    );
  }
}