exports.handler = async function (event, context) {
  const session = process.env.REVEL_SESSION;
  const contestName = 'ahc048';

  const urls = [
    `https://atcoder.jp/contests/${contestName}/results/json`,
    `https://atcoder.jp/contests/${contestName}/standings/json`
  ];

  const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

  try {
    const results = [];

    for (let i = 0; i < urls.length; i++) {
      const res = await fetch(urls[i], {
        headers: {
          'Cookie': `REVEL_SESSION=${session}`,
        }
      });

      if (!res.ok) {
        return {
          statusCode: res.status,
          body: JSON.stringify({ error: `AtCoder responded with ${res.status}` })
        };
      }

      const json = await res.json();
      results.push(json);

      // 1秒待つ
      if (i < urls.length - 1) {
        await delay(1000);
      }
    }

    return {
      statusCode: 200,
      body: JSON.stringify({
        resultsJson: results[0],
        standingsJson: results[1],
      }),
    };

  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Fetch failed', details: err.message })
    };
  }
}