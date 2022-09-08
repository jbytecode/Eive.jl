var documenterSearchIndex = {"docs":
[{"location":"cga/#Compact-Genetic-Algorithm","page":"CGA","title":"Compact Genetic Algorithm","text":"","category":"section"},{"location":"cga/#cgasample","page":"CGA","title":"cgasample","text":"","category":"section"},{"location":"cga/","page":"CGA","title":"CGA","text":"ErrorsInVariables.cgasample","category":"page"},{"location":"cga/#ErrorsInVariables.CGA.cgasample","page":"CGA","title":"ErrorsInVariables.CGA.cgasample","text":"Generates a binary array of values using a probability vector. Each single element of the probability vector is the probability of bit having  the value of 1. When the probability vector is [1, 1, 1, ..., 1] then the sampled vector is [1.0, 1.0, 1.0, ..., 1.0] whereas it is [0.0, 0.0, 0.0, ..., 0.0] when the probability vector is a vector of zeros. The CGA (compact genetic algorithms) search is started using the  probability vector of [0.5, 0.5, 0.5, ..., 0.5] which produces random vectors of either zeros or ones.\n\nExamples\n\njulia> sample([1, 1, 1, 1, 1])\n5-element Array{Bool,1}:\n 1\n 1\n 1\n 1\n 1\njulia> cgasample(ones(10) * 0.5)\n10-element Array{Bool,1}:\n 1\n 1\n 1\n 1\n 0\n 0\n 0\n 1\n 1\n 0\n\n\n\n\n\n","category":"function"},{"location":"cga/#cga","page":"CGA","title":"cga","text":"","category":"section"},{"location":"cga/","page":"CGA","title":"CGA","text":"ErrorsInVariables.cga","category":"page"},{"location":"cga/#ErrorsInVariables.CGA.cga","page":"CGA","title":"ErrorsInVariables.CGA.cga","text":"Performs a CGA (Compact Genetic Algorithm) search for minimization of an objective function. In the example below, the objective function is to minimize sum of bits of a binary vector. The search method results the optimum vector of [0, 0, ..., 0] where the objective function is zero.\n\nExamples\n\njulia> function f(x)\n           return sum(x)\n       end\nf (generic function with 1 method)\njulia> cga(chsize = 10, costfunction = f, popsize = 100)\n10-element Array{Bool,1}:\n 0\n 0\n 0\n 0\n 0\n 0\n 0\n 0\n 0\n 0\n\n\n\n\n\n","category":"function"},{"location":"estimator/#The-EIVE-CGA-Estimator","page":"The Estimator","title":"The EIVE-CGA Estimator","text":"","category":"section"},{"location":"estimator/#eive","page":"The Estimator","title":"eive","text":"","category":"section"},{"location":"estimator/","page":"The Estimator","title":"The Estimator","text":"ErrorsInVariables.eive","category":"page"},{"location":"estimator/#ErrorsInVariables.Estimator.eive","page":"The Estimator","title":"ErrorsInVariables.Estimator.eive","text":"eive(;\ndirtyx::Array{T,1},\ny::Array{T,1},\notherx::Union{Nothing,Array{T,2},Array{T,1}},\npopsize::Int = 50,\nnumdummies::Int = 10,\nrng::AbstractRNG = MersenneTwister(1234)\n\n)::EiveResult where {T<:Real}\n\nDescription:\n\nThe method searches for a set of dummy (binary) variables that separates the erroneous independent variable into clean part and error part. The clean part is then used in the main regression estimation.  Those dummy variables minimize the sum of squares of residuals of the main regression. In other terms the methods searches for a set of proxy variables that do not exist in real. Please see the reference for details.  \n\nArguments:\n\ndirtyx: Independent variable measured with some error\ny: Dependent variable\notherx: Matrix of other independent variables\npopsize: Number of individuals in the population (optional)\nnumdummies: Number of dummy variables to use (optional)\nrng: Random number generator (optional)\n\nExamples\n\njulia> import Random\njulia> using ErrorsInVariables\njulia> rng = Random.MersenneTwister(1234)\njulia> n = 30\njulia> deltax = randn(rng, n) * sqrt(3.0)\njulia> cleanx = randn(rng, n) * sqrt(7.0)\njulia> e = randn(rng, n) * sqrt(5.0)\njulia> y = 20.0 .+ 10.0 .* cleanx .+ e\njulia> dirtyx = cleanx + deltax\njulia> eive(dirtyx = dirtyx, y = y, otherx = nothing) \n\nEiveResult([20.28458307772922, 9.456757289676714])\n\njulia> X = hcat(ones(n), dirtyx);\n\njulia> # Biased OLS estimates:\njulia> X \\ y\n2-element Vector{Float64}:\n 17.94867860059858\n  5.8099584879737876\n\nReferences\n\nSatman, M. Hakan, and Erkin Diyarbakirlioglu. \"Reducing errors-in-variables bias in linear  regression using compact genetic algorithms.\" Journal of Statistical Computation and Simulation  85.16 (2015): 3216-3235.\n\n\n\n\n\n","category":"function"},{"location":"","page":"ErrorsInVariables.jl","title":"ErrorsInVariables.jl","text":"(Image: Doc) (Image: codecov)","category":"page"},{"location":"#ErrorsInVariables.jl","page":"ErrorsInVariables.jl","title":"ErrorsInVariables.jl","text":"","category":"section"},{"location":"","page":"ErrorsInVariables.jl","title":"ErrorsInVariables.jl","text":"Error-in-variables estimation using Compact Genetic Algorithms in Julia","category":"page"},{"location":"#Usage","page":"ErrorsInVariables.jl","title":"Usage","text":"","category":"section"},{"location":"","page":"ErrorsInVariables.jl","title":"ErrorsInVariables.jl","text":"For the single variable case ","category":"page"},{"location":"","page":"ErrorsInVariables.jl","title":"ErrorsInVariables.jl","text":"julia> eive(dirtyx = dirtyx, y = y, otherx = nothing) ","category":"page"},{"location":"","page":"ErrorsInVariables.jl","title":"ErrorsInVariables.jl","text":"and for the multiple regression ","category":"page"},{"location":"","page":"ErrorsInVariables.jl","title":"ErrorsInVariables.jl","text":"julia> eive(dirtyx = dirtyx, y = y, otherx = matrixofotherx) ","category":"page"},{"location":"","page":"ErrorsInVariables.jl","title":"ErrorsInVariables.jl","text":"Note that the method assumes there is only one erroneous variable in the set of independent variables.","category":"page"},{"location":"#Example","page":"ErrorsInVariables.jl","title":"Example","text":"","category":"section"},{"location":"","page":"ErrorsInVariables.jl","title":"ErrorsInVariables.jl","text":"Lets generate data from the model y = 20 + 10x^* + varepsilon","category":"page"},{"location":"","page":"ErrorsInVariables.jl","title":"ErrorsInVariables.jl","text":"import Random\nusing ErrorsInVariables\n\nrng = Random.MersenneTwister(1234)\nn = 30\ndeltax = randn(rng, n) * sqrt(3.0)\ncleanx = randn(rng, n) * sqrt(7.0)\ne = randn(rng, n) * sqrt(5.0)\ny = 20.0 .+ 10.0 .* cleanx .+ e\ndirtyx = cleanx\neive(dirtyx = dirtyx, y = y, otherx = nothing) ","category":"page"},{"location":"","page":"ErrorsInVariables.jl","title":"ErrorsInVariables.jl","text":"The result is ","category":"page"},{"location":"","page":"ErrorsInVariables.jl","title":"ErrorsInVariables.jl","text":"EiveResult([20.28458307772922, 9.456757289676714])","category":"page"},{"location":"","page":"ErrorsInVariables.jl","title":"ErrorsInVariables.jl","text":"whereas OLS estimates are","category":"page"},{"location":"","page":"ErrorsInVariables.jl","title":"ErrorsInVariables.jl","text":"julia> X = hcat(ones(n), dirtyx);\n\njulia> X \\ y\n2-element Vector{Float64}:\n 17.94867860059858\n  5.8099584879737876","category":"page"},{"location":"","page":"ErrorsInVariables.jl","title":"ErrorsInVariables.jl","text":"and clearly biased towards to zero.","category":"page"},{"location":"#Citation","page":"ErrorsInVariables.jl","title":"Citation","text":"","category":"section"},{"location":"","page":"ErrorsInVariables.jl","title":"ErrorsInVariables.jl","text":"@article{satman2015reducing,\n  title={Reducing errors-in-variables bias in linear regression using compact genetic algorithms},\n  author={Satman, M Hakan and Diyarbakirlioglu, Erkin},\n  journal={Journal of Statistical Computation and Simulation},\n  volume={85},\n  number={16},\n  pages={3216--3235},\n  year={2015},\n  publisher={Taylor \\& Francis}\n}","category":"page"}]
}
