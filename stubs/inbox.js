import Empire from './empire.js';

const Inbox = {
  view_archived() {
    return {
      messages: [],
      message_count: 0,
      status: Empire.status_block(),
    };
  },

  view_inbox() {
    return {
      messages: [
        {
          id: 'id-goes-here',
          subject: 'Vaxaslim',
          date: '01 31 2010 13:09:05 +0600',
          from: 'Dr. Stephen T. Colbert DFA',
          from_id: 'id-goes-here',
          to: 'Jon Stewart',
          to_id: 'id-goes-here',
          has_read: 1,
          has_replied: 0,
          body_preview: 'Just a reminder that Vaxaslim',
          tags: 'Correspondence',
        },
      ],
      message_count: 4,
      status: Empire.status_block(),
    };
  },

  view_sent() {
    return {
      messages: [],
      message_count: 0,
      status: Empire.status_block(),
    };
  },

  view_trashed() {
    return {
      messages: [],
      message_count: 0,
      status: Empire.status_block(),
    };
  },

  view_unread() {
    return {
      messages: [],
      message_count: 0,
      status: Empire.status_block(),
    };
  },
};

export default Inbox;
