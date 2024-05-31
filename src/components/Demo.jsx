import { useState, useEffect } from "react";
import { copy, linkIcon, loader, tick } from "../assets";
import { useLazyGetSummaryQuery } from "../services/article";

const Demo = () => {
	const [article, setArticle] = useState({ url: "", summary: "" });
	const [allArticles, setAllArticles] = useState([]);
	const [copiedUrl, setCopiedUrl] = useState("");
	const [copiedSum, setCopiedSum] = useState("");

	useEffect(() => {
		const articlesFromLocalStorage = JSON.parse(
			localStorage.getItem("articles")
		);

		if (articlesFromLocalStorage) {
			setAllArticles(articlesFromLocalStorage);
		}
	}, []);

	const handleSubmit = async (e) => {
		e.preventDefault();

		const { data } = await getSummary({ articleUrl: article.url });

		if (data?.summary) {
			const newArticle = { ...article, summary: data.summary };

			const updatedAllArticles = [newArticle, ...allArticles];

			setArticle(newArticle);
			setAllArticles(updatedAllArticles);

			localStorage.setItem(
				"articles",
				JSON.stringify(updatedAllArticles)
			);
		}
	};

	const handleCopyUrl = (copyUrl) => {
		setCopiedUrl(copyUrl);
		navigator.clipboard.writeText(copyUrl);
		setTimeout(() => {
			setCopiedUrl("");
		}, 3000);
	};

	const handleCopySum = (copySum) => {
		setCopiedSum(copySum);
		navigator.clipboard.writeText(copySum);
		setTimeout(() => {
			setCopiedSum("");
		}, 3000);
	};

	const [getSummary, { error, isFetching }] = useLazyGetSummaryQuery();

	return (
		<section className="mt-16 w-full max-w-xl">
			<div className="flex flex-col w-full gap-2">
				<form
					className="relative flex justify-center items-center"
					onSubmit={handleSubmit}
				>
					<img
						src={linkIcon}
						alt="linkIcon"
						className="absolute left-0 my-2 ml-3 w-5"
					/>

					<input
						type="url"
						placeholder="Enter a URL"
						value={article.url}
						onChange={(e) => {
							setArticle({ ...article, url: e.target.value });
						}}
						required
						className="url_input peer"
					/>

					<button
						type="submit"
						className="submit_btn peer-focus:border-gray-700 peer-focus:text-gray-700"
					>
						↵
					</button>
				</form>

				{/* History */}
				<div className="flex flex-col gap-2 max-h-60 overflow-y-scroll no-scrollbar">
					{allArticles.map((article, index) => (
						<div
							key={index}
							onClick={() => setArticle(article)}
							className="link_card"
						>
							<div className="copy_btn">
								<img
									src={
										copiedUrl === article.url ? tick : copy
									}
									alt="copybtn"
									onClick={() => handleCopyUrl(article.url)}
									className="w-[80%] h-[70%] bold object-contain"
								/>
							</div>
							<p className="flex-1 font-satoshi text-blue-700 font-medium text-sm truncate">
								{article.url}
							</p>
						</div>
					))}
				</div>
			</div>

			<div className="my-10 max-w-full flex justify-center items-center">
				{isFetching ? (
					<img
						src={loader}
						alt="loader"
						className="w-20 h-20 object-contain"
					/>
				) : error ? (
					<p className="font-inter font-bold text-center">
						Error! {error?.data?.error}
					</p>
				) : (
					article?.summary && (
						<div className="flex flex-col gap-3 mt-5">
							<h2 className="font-satoshi font-bold text-2xl text-white/85">
								Article Summary
							</h2>
							<div>
								<p className="font-inter font-medium text-lg text-white/85">
									{article.summary}
								</p>
							</div>
							<button
								onClick={() => handleCopySum(article.summary)}
								className="w-8 h-8 bg-white/80 rounded-lg p-1 bold object-contain"
							>
								{copiedSum === article.summary ? (
									<img
										src={tick}
										alt="copybtn"
										className="w-full h-full bold object-contain"
									/>
								) : (
									<img
										src={copy}
										alt="copybtn"
										className="w-full h-full bold object-contain"
									/>
								)}
							</button>
						</div>
					)
				)}
			</div>
		</section>
	);
};

export default Demo;
