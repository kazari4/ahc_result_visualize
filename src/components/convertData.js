export function convertData(resultsJson, standingsJson) {
  // Performanceを取得するためのMap
  const performanceMap = new Map(
    resultsJson.map(entry => [entry.UserScreenName, entry.Performance])
  );

  // TaskScreenNameを取得
  const targetTask = standingsJson.TaskInfo[standingsJson.TaskInfo.length - 1].TaskScreenName

  // スコアが0より大きいユーザーのみを整形
  const formatted = standingsJson.StandingsData
    .filter(entry => {
      const taskResult = entry.TaskResults?.[targetTask];
      return taskResult?.Score > 0 && entry.IsRated === true;
    })
    .map((entry, i) => {
      const user = entry.UserScreenName;
      const taskResult = entry.TaskResults[targetTask];

      return {
        key: user,
        Rank: entry.Rank,
        RankIndex: i + 1,
        UserScreenName: user,
        Score: taskResult.Score,
        SubmissionId: taskResult.SubmissionID,
        Performance: performanceMap.get(user) ?? null
      };
    });

  return formatted;
}
