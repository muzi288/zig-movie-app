

using System.Net;
using Microsoft.AspNetCore.Mvc.Testing;
using Xunit;

namespace serverside.Tests;

public class MoviesControllerTests 
    : IClassFixture<WebApplicationFactory<Program>>
{
    private readonly HttpClient _client;

    public MoviesControllerTests(WebApplicationFactory<Program> factory)
    {
        _client = factory.CreateClient();
    }

    [Fact]
    public async Task GetPopular_ReturnsOk()
    {
        // Act
        var response = await _client.GetAsync("/api/popular");

        // Assert
        Assert.Equal(HttpStatusCode.OK, response.StatusCode);
    }

    [Fact]
    public async Task Search_ReturnsOk()
    {
        var response = await _client.GetAsync("/api/search?query=batman");

        Assert.Equal(HttpStatusCode.OK, response.StatusCode);
    }

    [Fact]
    public async Task GetMovieById_ReturnsOkOrNotFound()
    {
        var response = await _client.GetAsync("/api/movie/550");

        Assert.True(
            response.StatusCode == HttpStatusCode.OK ||
            response.StatusCode == HttpStatusCode.NotFound
        );
    }
}
