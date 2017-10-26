insert into shops (s_name, address)
values ($1, $2)
returning *
