using openlab_project;
using openlab_project.Dto.guild;
using openlab_project.Models;

namespace openlab_project.Services
{
    public interface IGuildService
    {
        GuildDetailsInfo? GetGuildDetail(int guildId);
        IEnumerable<GuildInfo> GetGuildInfo();
        GuildDetailsInfo? AddCurrentUserToGuild(ApplicationUser? user, int guildId);
        GuildDetailsInfo? RemoveCurrentUserFromGuild(ApplicationUser? user);
        CreateGuild? CreateGuild(CreateGuild? guild);
    }
}
