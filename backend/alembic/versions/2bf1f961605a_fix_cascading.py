"""fix cascading

Revision ID: 2bf1f961605a
Revises: 9f944341d5c4
Create Date: 2025-05-07 09:12:28.406972

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '2bf1f961605a'
down_revision: Union[str, None] = '9f944341d5c4'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint('unique_user_car_favorite', 'favorites', type_='unique')
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_unique_constraint('unique_user_car_favorite', 'favorites', ['user_id', 'car_id'])
    # ### end Alembic commands ###
