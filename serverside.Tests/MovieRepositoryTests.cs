using serverside.Repositories;
using serverside.Tests.Helpers;
using Xunit;
using System.Net.Http;

namespace serverside.Tests.Repositories;

public class MovieRepositoryTests
{
    [Fact]
    public async Task GetPopularAsync_ReturnsMovies()
    {
        // Fake TMDB response
        var fakeJson = """
        {
          "results": [
            {
              "id": 1,
              "title": "Fake Movie",
              "overview": "Test overview"
            }
          ]
        }
        """;

        var handler = new FakeHttpMessageHandler(fakeJson);
        var client = new HttpClient(handler)
        {
            BaseAddress = new Uri("https://api.themoviedb.org/3/")
        };

        Environment.SetEnvironmentVariable("API_KEY", "fake");

        var repo = new MovieRepositoryTestWrapper(client);

        var result = await repo.GetPopularAsync();

        Assert.Single(result);
        Assert.Equal("Fake Movie", result[0].Title);
    }
}