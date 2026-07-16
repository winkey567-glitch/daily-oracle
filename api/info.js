// GET /api/info — Service description for ASP registration
export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  res.status(200).json({
    service: 'Daily Oracle',
    description: 'Ancient Chinese I Ching (Book of Changes) divination service. Uses the traditional three-coin method to cast a hexagram from 64 possible outcomes, providing fortune readings across career, wealth, love, and health dimensions. Each reading includes the hexagram name, judgment text, image text, detailed interpretation, changing lines, and four-dimensional fortune assessment.',
    type: 'A2MCP',
    category: 'art',
    pricing: 'free',
    endpoints: [
      {
        method: 'POST',
        path: '/api/divine',
        description: 'Cast an I Ching hexagram using the traditional 3-coin method. Returns a complete fortune reading.',
        request: {
          content_type: 'application/json',
          body: {
            question: 'string (optional) - The question or concern on the user mind'
          }
        },
        response: {
          content_type: 'application/json',
          fields: {
            hexagram: 'object - The primary hexagram (id, name, symbol, binary, fortune, judgment, image, reading, tags)',
            changing_lines: 'array - Indices of changing lines (0-5)',
            changed_hexagram: 'object|null - The transformed hexagram if changing lines exist',
            lines: 'array - The 6 coin toss results with line types',
            timestamp: 'string - ISO timestamp of the reading'
          }
        }
      },
      {
        method: 'GET',
        path: '/api/info',
        description: 'Service description and API documentation'
      }
    ],
    features: [
      '64 hexagrams from the I Ching (Book of Changes)',
      'Traditional three-coin divination method',
      'Changing lines (yao) with transformation hexagram',
      'Four-dimensional fortune: career, wealth, love, health',
      'Detailed interpretation and guidance text',
      'Unicode hexagram symbols',
      'On-chain attestation via OKX X Layer (companion DApp)'
    ],
    cultural: 'Rooted in 3000+ years of Chinese divination tradition, the I Ching is one of the oldest classical texts in the world.',
    links: {
      dapp: 'https://daily-oracle-three.vercel.app/',
      github: 'https://github.com/winkey567-glitch/daily-oracle'
    }
  });
}
