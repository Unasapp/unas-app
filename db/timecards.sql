select
	barbers.b_first,
	barbers.b_last,
	timecards.time_in,
	timecards.time_out
from
	barbers, timecards, shops
where
	barber_id = b_id
and
	s_id = shop_id
and
	shops.s_id = $1
