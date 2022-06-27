import _ from 'lodash';
import Empire from './empire.js';
import Body from './body.js';
import { Route } from '../interfaces.js';

const Inbox: Route = {
  read_message(req, res) {
    return {
      message: {
        id: 'id-goes-here',
        from: 'Dr. Stephen T. Colbert DFA',
        from_id: 'id-goes-here',
        to: 'Jon Stewart',
        to_id: 'id-goes-here',
        subject: 'Vaxaslim',
        body: 'This is a test email to demonstrate the capabilities of the email reader.\n\nHave fun!',
        date: '01 31 2010 13:09:05 +0600',
        has_read: 1,
        has_replied: 0,
        has_archived: 0,
        has_trashed: 0,
        in_reply_to: '',
        recipients: ['John Stewart'],
        tags: ['Correspondence'],
        attachments: {
          image: {
            url: `${req.protocol}://${req.get('host')}/email_attachment.png`,
            title: 'You can include image attachments!',
            link: 'http://kenoantigen.com/', // optional link to somewhere
          },
          link: {
            url: 'http://kenoantigen.com/',
            label: 'The Kenó Antigen Website',
          },
          table: [
            ['Hostname', 'IP Address'], // first row is always a header
            ['example.lacunaexpanse.com', '192.168.1.24'],
          ],
          map: {
            surface: 'surface-p6',
            buildings: _.values(Body.get_buildings(req, res).buildings),
          },
        },
      },
      status: Empire.get_status(req, res),
    };
  },

  view_archived(req, res) {
    return {
      messages: [],
      message_count: 0,
      status: Empire.get_status(req, res),
    };
  },

  view_inbox(req, res) {
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
      status: Empire.get_status(req, res),
    };
  },

  view_sent(req, res) {
    return {
      messages: [],
      message_count: 0,
      status: Empire.get_status(req, res),
    };
  },

  view_trashed(req, res) {
    return {
      messages: [],
      message_count: 0,
      status: Empire.get_status(req, res),
    };
  },

  view_unread(req, res) {
    return {
      messages: [],
      message_count: 0,
      status: Empire.get_status(req, res),
    };
  },
};

export default Inbox;
