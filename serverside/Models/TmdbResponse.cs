using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace serverside.Models;

public class TmdbResponse
{
    [JsonPropertyName("results")]
    public List<MovieDto> Results { get; set; } = new();
}
