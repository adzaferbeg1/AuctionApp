const Pagination = ({ postsPerPage, totalPosts, paginate }) => {
	const pageNumbers = [];

	for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++)
		pageNumbers.push(i);

	return (
		<nav>
			<ul className="pagination">
				{pageNumbers.map((number) => (
					<li key={number + " pagination "} className="page-item">
						<div className="page-link" onClick={() => paginate(number)}>
							{number}
						</div>
					</li>
				))}
			</ul>
		</nav>
	);
};

export default Pagination;
