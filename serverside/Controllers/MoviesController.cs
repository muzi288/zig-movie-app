using Microsoft.AspNetCore.Mvc;
using System.Net.Http;
using System.Text.Json;
using serverside.Models;

namespace serverside.Controllers
{
    [ApiController]
    [Route("api")]
    public class MoviesController : ControllerBase
    {
        private readonly HttpClient _httpClient;
        private readonly string _apiKey;

        public MoviesController(IConfiguration config)
        {
            _httpClient = new HttpClient();
            _apiKey = config["TMDB_API_KEY"];
        }

        // GET api/popular
        [HttpGet("popular")]
        public async Task<IActionResult> GetPopularMovies()
        {
            var url =
                $"https://api.themoviedb.org/3/movie/popular?api_key={_apiKey}&language=en-US&page=1";

            var response = await _httpClient.GetStringAsync(url);


            using var json = JsonDocument.Parse(response);

            var results = json.RootElement
                                .GetProperty("results")
                                .EnumerateArray()
                                .Take(20)
                                .Select(movie => JsonDocument.Parse(movie.GetRawText()).RootElement)
                                .ToList();

            return Ok(results);
        }

        // GET api/search?query=birdbox
        [HttpGet("search")]
        public async Task<IActionResult> SearchMovies([FromQuery] string query)
        {
            var url = $"https://api.themoviedb.org/3/search/movie?api_key={_apiKey}&query={query}";

            var response = await _httpClient.GetStringAsync(url);
            using var json = JsonDocument.Parse(response);

            var results = json.RootElement
                                .GetProperty("results")
                                .EnumerateArray()
                                .Take(20) // Top 20 results only
                                .Select(movie => JsonDocument.Parse(movie.GetRawText()).RootElement)
                                .ToList();

            return Ok(results);
        }

        // GET api/movie/1145
        [HttpGet("movie/{id}")]
        public async Task<IActionResult> GetMovieById(int id)
        {
            var url = $"https://api.themoviedb.org/3/movie/{id}?api_key={_apiKey}";

            try
            {
                var response = await _httpClient.GetAsync(url);

                if (!response.IsSuccessStatusCode)
                {
                    return NotFound(new { message = $"Movie with ID {id} not found." });
                }

                var content = await response.Content.ReadAsStringAsync();
                return Content(content, "application/json");
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "An error occurred.", details = ex.Message });
            }
        }
    }
}
