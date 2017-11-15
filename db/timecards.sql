select distinct
	users.first_name,
	users.last_name,
	timecards.time_in,
	timecards.time_out,
	timecards.t_id
from
	users, timecards, shops
where
	user_id = id
and
	timecards.shop_id = $1
and
	time_in between $2 and $3
