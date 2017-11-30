select * from users
join shops on shop_id = s_id
where email like $1
and password like $2
