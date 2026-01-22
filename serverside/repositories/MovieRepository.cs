using System.Text.Json;
using serverside.HttpClients;
using serverside.Models;

namespace serverside.Repositories;

public class MovieRepository
{
    private readonly HttpClient _client = TmdbHttpClient.Instance;
    private readonly string _apiKey;

    public MovieRepository()
    {
        _apiKey = Environment.GetEnvironmentVariable("API_KEY")
                  ?? throw new Exception("API_KEY environment variable not set");
    }

    public async Task<List<MovieDto>> GetPopularAsync()
    {
        var res = await _client.GetAsync($"movie/popular?api_key={_apiKey}");
        res.EnsureSuccessStatusCode();

        var json = await res.Content.ReadAsStringAsync();
        return JsonSerializer.Deserialize<TmdbResponse>(json)!.Results.Take(20).ToList();
    }

    public async Task<List<MovieDto>> SearchAsync(string query)
    {
        var res = await _client.GetAsync($"search/movie?api_key={_apiKey}&query={query}");
        res.EnsureSuccessStatusCode();

        var json = await res.Content.ReadAsStringAsync();
        return JsonSerializer.Deserialize<TmdbResponse>(json)!.Results;
    }

    public async Task<MovieDto?> GetByIdAsync(int id)
    {
        var res = await _client.GetAsync($"movie/{id}?api_key={_apiKey}");
        res.EnsureSuccessStatusCode();

        var json = await res.Content.ReadAsStringAsync();
        return JsonSerializer.Deserialize<MovieDto>(json);
    }

    protected MovieRepository(HttpClient client, string apiKey)
    {
        _client = client;
        _apiKey = apiKey;
    }
}
