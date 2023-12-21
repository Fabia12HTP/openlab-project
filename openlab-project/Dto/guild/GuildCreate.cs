namespace openlab_project.Dto.guild
{
    public class GuildCreate
    {
        private string name;

        public string Name { get => name; set => name = value; }
        public string Description { get => Description; set => Description = value; }
        public int Maxmember { get => Maxmember; set => Maxmember = value; }
    }
}
