const rigidBoxImageUrl = require('~/static/rigid_box.png');
const rigidBox2PieceNCImageUrl = require('~/static/rigid_2pc-nc.png');
const rigidBox2PieceCImageUrl = require('~/static/rigid_2pc-c.png');
const rigidBoxDrawerCImageUrl = require('~/static/rigid_drawer-c.png');
const foldingBoxImageUrl = require('~/static/folding_box.png');
const folding1PieceImageUrl = require('~/static/folding_1pc-folding.png');
const folding2PieceImageUrl = require('~/static/folding_2pc-folding.png');
const foldingDrawerImageUrl = require('~/static/folding_drawer-folding.png');

export default [
  {
    name: 'rigid',
    verboseName: 'Rigid box',
    image: rigidBoxImageUrl,
    styles: [
      {
        name: '2pc-nc',
        verboseName: 'Two piece box / Non-collapsible',
        image: rigidBox2PieceNCImageUrl
      },
      {
        name: '2pc-c',
        verboseName: 'Two piece box / Collapsible',
        image: rigidBox2PieceCImageUrl
      },
      {
        name: 'drawer-c',
        verboseName: 'Drawer box / Collapsible',
        image: rigidBoxDrawerCImageUrl
      }
    ]
  },
  {
    name: 'folding',
    verboseName: 'Folding box',
    image: foldingBoxImageUrl,
    styles: [
      {
        name: '1pc-folding',
        verboseName: 'One piece / Folding box',
        image: folding1PieceImageUrl
      },
      {
        name: '2pc-folding',
        verboseName: 'Two piece / Folding box',
        image: folding2PieceImageUrl
      },
      {
        name: 'drawer-folding',
        verboseName: 'Drawer / Folding box',
        image: foldingDrawerImageUrl
      }
    ]
  }
];
